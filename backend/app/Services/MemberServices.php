<?php

namespace App\Services;

use App\Events\MemberCreatedEvent;
use App\Models\Member;
use Illuminate\Support\Facades\Auth;

class MemberServices
{
    public function addMember(array $data){
        try {

            $member = Member::create([
                'team_id' => $data['team_id'],
                'user_id' => $data['user_id'],
            ]);

            event(new MemberCreatedEvent($member));

            
            
        } catch (\Exception $e) {
            return [
                'success' => false,
                'message' => 'Erreur lors de l\'ajout de membre',
                'error' => $e->getMessage(),
            ];
        }

        return [
            'success' => true,
            'message' => 'Membre ajouté avec succès',
            'data' => $member,
        ];
    }

    public function deleteMember(Member $member){
        try {
            if($member->user_id == Auth::id()){
                return [
                    'success' => false,
                    'message' => 'Vous ne pouvez pas supprimer',
                ];
            }
            if($member->team->user_id != Auth::id()){
                return [
                    'success' => false,
                    'message' => 'Vous n\'avez pas le droit de supprimer',
                ];
            }  

            if($member->team->members->count() == 1){
                return [
                    'success' => false,
                    'message' => 'Vous ne pouvez pas supprimer',
                ];
            }
            
            $member->delete();
            return [
                'success' => true,
                'message' => 'Membre supprimé avec succès',
            ];
        } catch (\Exception $e) {
            return [
                'success' => false,
                'message' => 'Erreur lors de la suppression du membre',
                'error' => $e->getMessage(),
            ];
        }
    }

    public function updateMember(Member $member, array $data){
        try {
            $member->update($data);
            return [
                'success' => true,
                'message' => 'Membre mis à jour avec succès',
                'data' => $member,
            ];
        } catch (\Exception $e) {
            return [
                'success' => false,
                'message' => 'Erreur lors de la mise à jour du membre',
                'error' => $e->getMessage(),
            ];
        }
    }

    public function getMembers(int $teamId){
        try {
            $members = Member::where('team_id', $teamId)->get();
            return [
                'success' => true,
                'message' => 'Membres trouvés avec succès',
                'data' => $members,
            ];
        } catch (\Exception $e) {
            return [
                'success' => false,
                'message' => 'Erreur lors de la recherche des membres',
                'error' => $e->getMessage(),
            ];
        }
    }    

    public function getAllMembers(){
        try {
            $members = Member::all();
            return [
                'success' => true,
                'message' => 'Membres trouvés avec succès',
                'data' => $members,
            ];
        } catch (\Exception $e) {
            return [
                'success' => false,
                'message' => 'Erreur lors de la recherche des membres',
                'error' => $e->getMessage(),
            ];
        }
    }

    public function getTeamMembers(int $teamId){
        try {
            $members = Member::where('team_id', $teamId)->get();
            return [
                'success' => true,
                'message' => 'Membres trouvés avec succès',
                'data' => $members,
            ];
        } catch (\Exception $e) {
            return [
                'success' => false,
                'message' => 'Erreur lors de la recherche des membres',
                'error' => $e->getMessage(),
            ];
        }
    }    

    public function showMember(Member $member){
        try {
            $member = $member->with('user', 'teamMate', 'team')->find($member->id);
            return [
                'success' => true,
                'message' => 'Membre trouvé avec succès',
                'data' => $member,
            ];
        } catch (\Exception $e) {
            return [
                'success' => false,
                'message' => 'Erreur lors de la recherche du membre',
                'error' => $e->getMessage(),
            ];
        }
    }               
}
