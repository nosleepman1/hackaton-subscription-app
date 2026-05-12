<?php

namespace App\Services;

use App\Events\TeamCreatedEvent;
use App\Http\Resources\TeamResource;
use App\Models\Member;
use App\Models\Team;
use Illuminate\Support\Facades\Auth;
use App\Models\Admin;

class TeamService
{

    public function createTeam(array $data){
        try {

            $captain = Auth::user();

            $data['user_id'] = $captain->id;

            $team = Team::create($data);
            if($team) {
                $member = Member::create([
                    'team_id' => $team->id,
                    'user_id' => $captain->id,
                ]);

                event(new TeamCreatedEvent($team, $captain));
            }
        } catch (\Exception $e) {
            return [
                'success' => false,
                'message' => 'Erreur lors de la création de l\'equipe',
                'error' => $e->getMessage(),
            ];
        }

        return [
            'success' => true,
            'message' => 'Equipe ajoutée avec succès',
            'data' => [$team, $member],

        ];
    }

    public function getTeams(){
        
        $user = Auth::user();

        if ($user instanceof Admin) {
            $teams = TeamResource::collection(Team::with('user')->paginate(10));
        } else {
            $teams = new TeamResource(Team::where('user_id', $user->id)
                        ->with('members', 'user')
                        ->with('project')
                        ->first());
        }

        return [
            'success'=> true,
            'message' => "Liste des équipes",
            'data' => $teams,
        ];
    }

    public function updateTeam(array $data, Team $team){
        try {
            $team->update($data);


        } catch (\Exception $e) {
            return [
                'success' => false,
                'message' => 'Erreur lors de la modification de l\'equipe',
                'error' => $e->getMessage(),
            ];
        }

        return [
            'success' => true,
            'message' => 'Equipe modifiée avec succès',
            'data' => $team,
        ];
    }

    public function deleteTeam(Team $team){
        try {
            
            $team->delete();
        } catch (\Exception $e) {
            return [
                'success' => false,
                'message' => 'Erreur lors de la suppression de l\'equipe',
                'error' => $e->getMessage(),
            ];
        }

        return [
            'success' => true,
            'message' => 'Equipe supprimée avec succès',
            'data' => $team,
        ];
    }

    public function showTeam(Team $team){
        try {
            $team = $team->with('user')->find($team->id);
        } catch (\Exception $e) {
            return [
                'success' => false,
                'message' => 'Erreur lors de la recherche de l\'equipe',
                'error' => $e->getMessage(),
            ];
        }

        return [
            'success' => true,
            'message' => 'Equipe trouvée avec succès',
            'data' => $team,
        ];
    }   
}
