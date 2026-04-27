<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\Team\StoreTeamRequest;
use App\Http\Requests\Team\UpdateTeamRequest;
use App\Models\Member;
use App\Models\Team;
use Illuminate\Support\Facades\Auth;

class TeamController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = Auth::user();

        if ($user instanceof \App\Models\Admin) {
            $teams = Team::with('user')->get();
        } else {
            // Normal user: see teams they created or are a member of
            $teams = Team::where('user_id', $user->id)
                ->orWhereHas('members', function ($query) use ($user) {
                    $query->where('user_id', $user->id);
                })
                ->with('user')
                ->get();
        }

        return response()->json([
            'success'=> true,
            'message' => "Liste des équipes",
            'data' => $teams,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTeamRequest $request)
    {
        try {
            $captain = Auth::user();
            $data = $request->validated();  
            $data['user_id'] = $captain->id;
            $team = Team::create($data);
            if($team) {
                $member = Member::create([
                    'team_id' => $team->id,
                    'user_id' => $captain->id,
                ]);
            }
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de l\'ajout de l\'equipe',
                'error' => $e->getMessage(),
            ]);
        }

        return response()->json([
            'success' => true,
            'message' => 'Equipe ajoutée avec succès',
            'data' => [$team, $member],

        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Team $team)
    {
        try {
            $team = Team::with('user')->find($team->id);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de la recherche de l\'equipe',
                'error' => $e->getMessage(),
            ]);
        }

        return response()->json([
            'success' => true,
            'message' => 'Equipe trouvée avec succès',
            'data' => $team,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTeamRequest $request, Team $team)
    {
        try {
            $team = $team->update($request->validated());
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de la modification de l\'equipe',
                'error' => $e->getMessage(),
            ]);
        }

        return response()->json([
            'success' => true,
            'message' => 'Equipe modifiée avec succès',
            'data' => $team,
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Team $team)
    {
        try {
            $team->delete();
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de la suppression de l\'equipe',
                'error' => $e->getMessage(),
            ]);
        }

        return response()->json([
            'success' => true,
            'message' => 'Equipe supprimée avec succès',
            'data' => $team,
        ]);
    }
}
