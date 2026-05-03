<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\Project\StoreProjectRequest;
use App\Http\Requests\Project\UpdateProjectRequest;
use App\Models\Project;
use App\Models\Theme;

class ProjectController extends Controller
{

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $this->authorize('viewAny', Project::class);
        return response()->json([
            'message' => 'Projets récupérés avec succès',
            'projects' => Project::where('deleted_at', null)->orderBy('name', 'asc')->get(),
        ]); 
    }

    /**
     * Project belongs to a specify theme
     */
    public function indexByTheme(Theme $theme) {
        
        $projects = Project::where('deleted_at', null)->where('theme_id', $theme->id)->orderBy('name', 'asc')->get();
        
        return response()->json([
            'message' => 'Projets récupérés avec succès',
            'projects' => $projects,
        ]); 
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProjectRequest $request) {
        $data = $request->validated();

        $project = Project::create($data);

        return response()->json([
            'message' => 'Projet créé avec succès',
            'project' => $project,
        ]); 
    }

    /**
     * Display the specified resource.
     */
    public function show(Project $project) {
        return response()->json([
            'message' => 'Projet récupéré avec succès',
            'project' => $project, 
        ]);     
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProjectRequest $request, Project $project) {
        try {
            $data = $request->validated();
            $project->update($data);
            return response()->json([
                'message' => 'Projet modifié avec succès',
                'project' => $project, 
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Erreur lors de la modification du projet',
                'error' => $e->getMessage(),
            ], 500);
        }   
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Project $project) {
       try{
            $project->delete();
            return response()->json([
                'message' => 'Projet supprimé avec succès',
            ]);     
       } catch (\Exception $e) {
            return response()->json([
                'message' => 'Erreur lors de la suppression du projet',
                'error' => $e->getMessage(),
            ], 500);
       }    
    }
}
