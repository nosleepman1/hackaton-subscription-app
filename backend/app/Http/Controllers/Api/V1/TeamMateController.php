<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\TeamMate;
use App\Models\Member;
use App\Models\Team;
use App\Http\Requests\TeamMate\StoreTeamMateRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class TeamMateController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json([
            'success' => true,
            'message' => 'Team mates récupérés avec succès',
            'data' => TeamMate::where('deleted_at', null)->orderBy('lastname', 'asc')->get(),
        ]);     
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTeamMateRequest $request)
    {
        try {            
            $teamMate = TeamMate::create($request->validated());
           
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
                'message' => 'Erreur lors de la création du coéquipier',
                'error' => $e->getMessage(),
            ]);
        }

        return response()->json([
            'success' => true,
            'message' => 'Coéquipier créé et ajouté à l\'équipe avec succès',
            'data' => [
                'team_mate' => $teamMate,
                'member'    => $member
            ]
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
