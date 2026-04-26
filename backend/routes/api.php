<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\V1\AuthController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::prefix("v1")->group(function () {
    
    Route::prefix("auth")->group(function () {
        Route::post("register", [AuthController::class, "register"]);
        Route::post("login", [AuthController::class, "login"]);
        Route::post("logout", [AuthController::class, "logout"])->middleware('auth:sanctum');
        Route::get("verify/{id}/{token}", [AuthController::class, "verify"])->name("verification.verify");
        Route::get("grades", [AuthController::class, "grades"]);
        Route::get("filieres", [AuthController::class, "filieres"]);
    });


    Route::prefix('team')->group(function () {

        
    });

});
