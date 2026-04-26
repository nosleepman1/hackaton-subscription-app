<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Requests\Auth\RegisterRequest;
use App\Services\AuthService;
use Illuminate\Http\Request;

class AuthController extends Controller
{

    public function __construct(
        protected AuthService $authService
    ) {}

    public function register(RegisterRequest $request) {
        $response = $this->authService->register($request->validated());
        return response()->json($response);
    }

    public function login(LoginRequest $request) {
        $response =  $this->authService->login($request->validated());
        return response()->json($response);
    }

    public function verify(Request $request, $id, $token) {
        $response = $this->authService->verify($request, $id, $token);
        return response()->json($response);
    }

    public function logout() {
        $response = $this->authService->logout();
        return response()->json($response);
    } 

    public function grades() {
        $response = $this->authService->grades();
        return response()->json($response);
    }

    public function filieres() {
        $response = $this->authService->filieres();
        return response()->json($response);
    }
}
