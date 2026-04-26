<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\V1\AuthController;
use App\Http\Controllers\Api\V1\ThemeController;
use App\Http\Controllers\Api\V1\ProjectController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::prefix("v1")->group(function () {
    
    Route::prefix("auth")->group(function () {
        Route::post("register", [AuthController::class, "register"]);
        Route::post("login", [AuthController::class, "login"]);
        Route::post("logout", [AuthController::class, "logout"])->middleware('auth:sanctum');
        Route::get("verify/{id}/{hash}", [AuthController::class, "verify"])->name("verification.verify");
        Route::get("grades", [AuthController::class, "grades"]);
        Route::get("filieres", [AuthController::class, "filieres"]);
    });


    Route::resource('themes', ThemeController::class)->middleware('auth:sanctum');
    Route::resource('projects', ProjectController::class)->middleware('auth:sanctum');
    

});
