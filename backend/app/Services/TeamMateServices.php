<?php

namespace App\Services;

use App\Models\Member;
use App\Models\Team;
use App\Models\TeamMate;
use Illuminate\Support\Facades\Auth;

class TeamMateServices
{
    public function createTeamMate(array $data) {
        try {
            $teamMate = TeamMate::create($data);
            $team = Team::where('user_id', Auth::id())->first();
            
            if ($team) {
                if ($team->members()->count() >= 5) {
                    return [
                        'success' => false,
                        'message' => 'Votre équipe a atteint le nombre maximum de membres (5).',
                    ];
                }

                $member = Member::create([
                    'user_id' => $teamMate->id,
                    'team_id' => $team->id,
                ]);

            } else {
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
    
    public function getTeamMateById($id) {
        
}
