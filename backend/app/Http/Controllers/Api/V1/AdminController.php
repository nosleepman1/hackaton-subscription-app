<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Team;
use App\Models\Member;
use App\Models\Interested;
use Illuminate\Support\Facades\DB;

class AdminController extends Controller
{
    public function storeTeamFromInteresteds(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'project_id' => 'required|exists:projects,id',
            'interested_ids' => 'required|array|min:3|max:5',
            'interested_ids.*' => 'exists:interesteds,id',
        ]);

        try {
            DB::beginTransaction();

            $interesteds = Interested::with('user')->whereIn('id', $data['interested_ids'])->get();
            
            // Check if all interesteds belong to the same project
            if ($interesteds->pluck('project_id')->unique()->count() > 1) {
                return response()->json([
                    'success' => false,
                    'message' => 'Tous les intéressés doivent être sur le même projet.',
                ], 422);
            }

            $weights = ['M2' => 5, 'M1' => 4, 'L3' => 3, 'L2' => 2, 'L1' => 1];
            
            $captainInterested = $interesteds->sortByDesc(function ($interested) use ($weights) {
                $grade = $interested->user->grade->value ?? $interested->user->grade;
                return $weights[$grade] ?? 0;
            })->first();

            $team = Team::create([
                'name' => $data['name'],
                'project_id' => $data['project_id'],
                'user_id' => $captainInterested->user_id,
            ]);

            foreach ($interesteds as $interested) {
                Member::create([
                    'team_id' => $team->id,
                    'user_id' => $interested->user_id,
                ]);
                $interested->delete(); // Soft delete
            }

            DB::commit();

            return response()->json([
                'success' => true,
                'message' => 'Equipe créée avec succès',
                'data' => $team->load('members.user'),
            ]);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de la création de l\'équipe',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}
