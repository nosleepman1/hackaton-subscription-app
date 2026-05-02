<?php

namespace App\Services;

use App\Http\Resources\InterrestResource;
use App\Models\Admin;
use App\Models\Interested;
use Illuminate\Support\Facades\Auth;

class InterrestServices
{
    public function index(){

        try {

            $user = Auth::user();

            if ($user instanceof Admin) {
                $response = InterrestResource::collection(Interested::with('user', 'project')->paginate(10));
            } else {
                $response = new InterrestResource(Interested::where('user_id', $user->id)->with('user', 'project')->first());
            }

        } catch (\Exception $e) {
            return [
                'success' => false,
                'message' => 'Erreur lors de la récupération',
                'error' => $e->getMessage(),
            ];
        }

        return [
            'success' => true,
            'message' => 'Liste des personnes intéressées',
            'data' => $response,
        ];
    }

    public function store(array $data) {
        try {
            $interested = Interested::create([
                'user_id' => Auth::id(),
                'project_id' => $data['project_id'],
            ]);
        } catch (\Exception $e) {
            return [
                'success' => false,
                'message' => 'Erreur lors de l\'ajout',
                'error' => $e->getMessage(),
            ];
        }

        return [
            'success' => true,
            'message' => 'Intérêt marqué avec succès',
            'data' => $interested,
        ];
    }

    public function show(Interested $interested){
       
        try {
            $interested->load('user', 'project');
        } catch (\Exception $e) {
            return [
                'success' => false,
                'message' => 'Erreur lors de la récupération',
                'error' => $e->getMessage(),
            ];
        }

        return [
            'success' => true,
            'message' => 'Détails récupérés avec succès',
            'data' => new InterrestResource($interested),
        ];
    }

    public function update(Interested $interested, array $data) {
        try {
            $interested->update($data);
        } catch (\Exception $e) {
            return [
                'success' => false,
                'message' => 'Erreur lors de la mise à jour',
                'error' => $e->getMessage(),
            ];
        }

        return [
            'success' => true,
            'message' => 'Intérêt mis à jour avec succès',
            'data' => $interested,
        ];
    }

    public function delete(Interested $interested) {
        try {
            $interested->delete();
        } catch (\Exception $e) {
            return [
                'success' => false,
                'message' => 'Erreur lors de la suppression',
                'error' => $e->getMessage(),
            ];
        }

        return [
            'success' => true,
            'message' => 'Intérêt supprimé avec succès',
        ];
    }
}
