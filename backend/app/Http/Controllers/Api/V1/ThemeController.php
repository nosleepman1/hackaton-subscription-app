<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Theme;
use App\Http\Requests\Theme\StoreThemeRequest;
use App\Http\Requests\Theme\UpdateThemeRequest;

class ThemeController extends Controller
{

    public function __construct() {
        $this->authorizeResource(Theme::class);
    }
    
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json([
            'message' => 'Thèmes récupérés avec succès',
            'themes' => Theme::where('deleted_at', null)->orderBy('name', 'asc')->get(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreThemeRequest $request)
    {
        $data = $request->validated();
        $theme = Theme::create($data);
        return response()->json([
            'message' => 'Thème créé avec succès',
            'theme' => $theme,
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Theme $theme)
    {
        return response()->json([
            'message' => 'Thème récupéré avec succès',
            'theme' => $theme,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateThemeRequest $request, Theme $theme)
    {
        $data = $request->validated();
        $theme->update($data);
        return response()->json([
            'message' => 'Thème modifié avec succès',
            'theme' => $theme,
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Theme $theme)
    {
        //soft delete
        $theme->delete();   
        return response()->json([
            'message' => 'Thème supprimé avec succès',
        ]);
    }
}
