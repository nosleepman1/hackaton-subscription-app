<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\projects\StoreProjectRequest;
use App\Http\Requests\projects\UpdateProjectRequest;
use App\Models\Project;

class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json([
            'message' => 'Projets récupérés avec succès',
            'projects' => Project::where('deleted_at', null)->orderBy('name', 'asc')->get(),
        ]); 
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProjectRequest $request)
    {
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
    public function show(Project $project)
    {
        return response()->json([
            'message' => 'Projet récupéré avec succès',
            'project' => $project, 
        ]);     
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProjectRequest $request, Project $project)
    {
        $data = $request->validated();
        $project->update($data);
        return response()->json([
            'message' => 'Projet modifié avec succès',
            'project' => $project, 
        ]);             
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Project $project)
    {
        $project->delete();
        return response()->json([
            'message' => 'Projet supprimé avec succès',
        ]);     
    }
}
