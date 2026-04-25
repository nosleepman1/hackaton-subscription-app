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
        Route::get("logout", [AuthController::class, "logout"]);
        Route::get("verify/{id}/{hash}", [AuthController::class, "verify"])->name("verification.verify");
    });


    Route::prefix('team')->group(function () {

        
    });

});
