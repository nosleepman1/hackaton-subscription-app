<?php

use App\Http\Controllers\Api\V1\AdminController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\V1\AuthController;
use App\Http\Controllers\Api\V1\ThemeController;
use App\Http\Controllers\Api\V1\ProjectController;
use App\Http\Controllers\Api\V1\TeamController;
use App\Http\Controllers\Api\V1\InterestedController;
use App\Http\Controllers\Api\V1\TeamMateController;
use App\Http\Controllers\Api\V1\MemberController;




Route::prefix("v1")->group(function () {

    Route::get('/user', function (Request $request) {
        $user = $request->user();
        if ($user instanceof \App\Models\Admin) {
            return array_merge($user->toArray(), ['role' => 'admin']);
        }
        return array_merge($user->toArray(), ['role' => 'user']);
    })->middleware('auth:sanctum');
    
    
    Route::prefix("auth")->group(function () {
        Route::post("register", [AuthController::class, "register"]);
        Route::post("login", [AuthController::class, "login"]);
        Route::post("logout", [AuthController::class, "logout"])->middleware('auth:sanctum');
        Route::get("verify/{id}/{hash}", [AuthController::class, "verify"])->name("verification.verify");
    });

    Route::get("grades", [AuthController::class, "grades"]);
    Route::get("filieres", [AuthController::class, "filieres"]);

    Route::apiResource('themes', ThemeController::class)->only(['index', 'show']);
    Route::apiResource('themes', ThemeController::class)->except(['index', 'show'])->middleware('auth:sanctum');
    Route::apiResource('teams', TeamController::class)->middleware('auth:sanctum');
    Route::apiResource('interesteds', InterestedController::class)->middleware('auth:sanctum');
    Route::apiResource('team-mates', TeamMateController::class)->middleware('auth:sanctum');
    Route::apiResource('members', MemberController::class)->middleware('auth:sanctum');


    Route::prefix("admin")->middleware(['auth:sanctum', 'admin'])->group(function () {
        Route::post('teams/from-interesteds', [AdminController::class, 'storeTeamFromInteresteds']);
    });

    Route::apiResource('projects', ProjectController::class)->only(['index', 'show']);
    Route::apiResource('projects', ProjectController::class)->except(['index', 'show'])->middleware('auth:sanctum');
    Route::get('/by-theme/{theme}', [ProjectController::class, 'indexByTheme']);


});
