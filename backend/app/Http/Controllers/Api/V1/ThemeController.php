<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Theme;
use App\Http\Requests\Theme\StoreThemeRequest;
use App\Http\Requests\Theme\UpdateThemeRequest;

class ThemeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreThemeRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Theme $theme)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateThemeRequest $request, Theme $theme)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Theme $theme)
    {
        //
    }
}
