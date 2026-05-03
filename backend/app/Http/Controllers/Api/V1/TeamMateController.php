<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\TeamMate;
use App\Models\Member;
use App\Models\Team;
use App\Http\Requests\TeamMate\StoreTeamMateRequest;
use App\Http\Requests\TeamMate\UpdateTeamMateRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Services\TeamMateServices;

class TeamMateController extends Controller
{

    public function __construct(protected TeamMateServices $teamMateServices)
    {
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $response = $this->teamMateServices->getTeamMates();
        
        return response()->json($response, $response['status'] ?? 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTeamMateRequest $request)
    {
        $response = $this->teamMateServices->createTeamMate($request->validated());
        
        return response()->json($response, $response['status'] ?? 200);
    }

    /**
     * Display the specified resource.
     */
    public function show(TeamMate $teamMate)
    {
        $response = $this->teamMateServices->getTeamMateById($teamMate->id);
    //-------------------------------------------------------------------------
        return response()->json($response, $response['status'] ?? 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTeamMateRequest $request, TeamMate $teamMate)
    {
        try {
            $teamMate->update($request->validated());
           
           $team = Team::where('user_id', Auth::id())->first();
           
           if ($team) {
                if ($team->members()->count() >= 5) {
                    return response()->json([
                        'success' => false,
                        'message' => 'L\'équipe a atteint le nombre maximum de 5 membres.',
                    ], 422);
                }

                $member = Member::create([
                    'team_id' => $team->id,
                    'team_mate_id' => $teamMate->id,
                ]);
           }
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de la mise à jour du coéquipier',
                'error' => $e->getMessage(),
            ]);
        }

        return response()->json([
            'success' => true,
            'message' => 'Coéquipier mis à jour avec succès',
            'data' => $teamMate,
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(TeamMate $teamMate)
    {
        try {
            $teamMate->delete();
            return response()->json([
                'success' => true,
                'message' => 'Coéquipier supprimé avec succès',
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de la suppression du coéquipier',
                'error' => $e->getMessage(),
            ]);
        }
    }
}
