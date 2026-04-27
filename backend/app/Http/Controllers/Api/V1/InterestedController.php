<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Interested;
use App\Http\Requests\Interested\StoreInterestedRequest;
use App\Http\Requests\Interested\UpdateInterestedRequest;
use Illuminate\Support\Facades\Auth;

class InterestedController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $user = Auth::user();

            if ($user instanceof \App\Models\Admin) {
                $query = Interested::with('user', 'project');
                if (request()->has('project_id')) {
                    $query->where('project_id', request('project_id'));
                }
                $interesteds = $query->get();
            } else {
                $interesteds = Interested::where('user_id', $user->id)->with('user', 'project')->get();
            }
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de la récupération',
                'error' => $e->getMessage(),
            ]);
        }

        return response()->json([
            'success' => true,
            'message' => 'Liste des personnes intéressées',
            'data' => $interesteds,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreInterestedRequest $request)
    {
        try {
            $interested = Interested::create([
                'user_id' => Auth::id(),
                'project_id' => $request->project_id,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de l\'ajout',
                'error' => $e->getMessage(),
            ]);
        }

        return response()->json([
            'success' => true,
            'message' => 'Intérêt marqué avec succès',
            'data' => $interested,
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Interested $interested)
    {
        try {
            $interested->load('user', 'project');
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de la récupération',
                'error' => $e->getMessage(),
            ]);
        }

        return response()->json([
            'success' => true,
            'message' => 'Détails récupérés avec succès',
            'data' => $interested,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateInterestedRequest $request, Interested $interested)
    {
        return response()->json([
            'success' => false,
            'message' => 'Action non supportée',
        ], 405);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Interested $interested)
    {
        try {
            $interested->delete();
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de la suppression',
                'error' => $e->getMessage(),
            ]);
        }

        return response()->json([
            'success' => true,
            'message' => 'Intérêt supprimé avec succès',
        ]);
    }
}
