<?php

namespace App\Services;

use App\Events\InterrestAddedInTeamEvent;
use App\Models\Interested;
use App\Models\Member;
use App\Models\Team;

class AdminServices
{
    /**
     * Create a new class instance.
     */
    public function __construct()
    {
        
    }

    public function createTeamUsingInteresteds(array $data){
        try {

            $interesteds = Interested::with('user')->whereIn('id', $data['interested_ids'])->get();
            
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
                event(new InterrestAddedInTeamEvent($team, $interested->user));
                
                $interested->delete();
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
            'message' => 'Equipe créée avec succès',
            'data' => $team->load('members.user'),
        ];
    }

    
} 
