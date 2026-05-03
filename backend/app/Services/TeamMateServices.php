<?php

namespace App\Services;

use App\Models\Member;
use App\Models\Team;
use App\Models\TeamMate;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class TeamMateServices
{

    public function __construct(private MemberServices $memberServices) {}


    public function createTeamMate(array $data) {
        try {
            $teamMate = TeamMate::create($data);

            $team = Team::where('user_id', Auth::id())->first();
            
            if ($team) {
                $teamMatesCount = Member::where('team_id', $team->id)->count();
                if ($teamMatesCount >= 5) {
                    return [
                        'success' => false,
                        'message' => 'Votre équipe a atteint le nombre maximum de membres (5).',
                    ];
                }

                $response = $this->memberServices->addMember([
                    'team_id' => $team->id,
                    'team_mate_id' => $teamMate->id,
                ]);
                $member = $response['data'];

            } else {
                $teamMate->delete();
                return [
                    'success' => false,
                    'message' => 'Aucune équipe trouvée',
                ];
            }

            return [
                'success' => true,
                'message' => 'Team mate créé avec succès',
                'data' => [$member, $teamMate],
            ];
        } catch (\Exception $e) {
            if (isset($teamMate)) {
                $teamMate->delete();
            }
            return [
                'success' => false,
                'message' => 'Erreur lors de la création du team mate',
                'error' => $e->getMessage(),
            ];
        }
    } 
    
    public function getTeamMates() {
        try {
            $team = Team::where('user_id', Auth::id())->first();
            
            if ($team) {
                $teamMates = $team->members()->with('teamMate')->get();
                return [
                    'success' => true,
                    'message' => 'Team mates récupérés avec succès',
                    'data' => $teamMates,
                ];
            } else {
                return [
                    'success' => false,
                    'message' => 'Aucune équipe trouvée',
                ];
            }
        } catch (\Exception $e) {
            return [
                'success' => false,
                'message' => 'Erreur lors de la récupération des team mates',
                'error' => $e->getMessage(),
            ];
        }
    }   
    
    public function deleteTeamMate(Member $member) {
        try {
            $team = Team::where('user_id', Auth::id())->first();
            if ($team) {
                if ($team->id != $member->team_id) {
                    return [
                        'success' => false,
                        'message' => ' Vous n\'êtes pas le propriétaire de l\'équipe',
                    ];
                }
            } else {
                return [
                    'success' => false,
                    'message' => 'Aucune équipe trouvée',
                ];
            }
            $teamMate = TeamMate::find($member->team_mate_id);
            $teamMate->delete();
            $member->delete();

            return [
                'success' => true,
                'message' => 'Team mate supprimé avec succès',
            ];
        } catch (\Exception $e) {
            return [
                'success' => false,
                'message' => 'Erreur lors de la suppression du team mate',
                'error' => $e->getMessage(),
            ];
        }
    } 
    
    public function getTeamMateById(int $id) {
        try {
            $teamMate = TeamMate::where('id', $id)->get();
            
            return [
                'success' => true,
                'message' => 'Team mate récupéré avec succès',
                'data' => $teamMate,
            ];
        } catch (\Exception $e) {
            return [
                'success' => false,
                'message' => 'Erreur lors de la récupération du team mate',
                'error' => $e->getMessage(),
            ];
        }
    }

    public function updateTeamMate(array $data, TeamMate $teamMate) {
        try {
            $teamMate->update($data);
           
           $team = Team::where('user_id', Auth::id())->first();
           
           if ($team) {
                if ($team->members()->count() >= 5) {
                    return [
                        'success' => false,
                        'message' => 'L\'équipe a atteint le nombre maximum de 5 membres.',
                    ];
                }

                $member = Member::create([
                    'team_id' => $team->id,
                    'team_mate_id' => $teamMate->id,
                ]);
           }
        } catch (\Exception $e) {
            return [
                'success' => false,
                'message' => 'Erreur lors de la mise à jour du coéquipier',
                'error' => $e->getMessage(),
            ];
        }

        return [
            'success' => true,
            'message' => 'Coéquipier mis à jour avec succès',
            'data' => $teamMate,
        ];
    }
        
}
