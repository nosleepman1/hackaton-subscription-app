<?php

namespace App\Services;

use App\Events\UserRegistered;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthService
{
    public function register($data) {

        $user = User::where('email', $data['email'])->first();

        if($user) {
            return [
                "success" => false,
                "message" => "Adresse mail deja existante"
            ];
        }
        $data['password'] = Hash::make($data['password']);
        $user = User::create($data);
        event(new UserRegistered($user));
        return [
            "success" => true,
            "message" => "Inscription reussie, verifiez votre mail"
        ];
    }

    public function login($data) {

        $user = User::where('email', $data['email'])->first();

        if(!$user || !Hash::check($data['password'], $user['password'])) {
            return [
                "success" => false,
                "message" => "Adresse mail ou mot de passe incorrect"
            ];
        }

        $token = $user->createToken('auth-token')->plainTextToken;

        return [
            "success" => true,
            'message' => "Connexion reussie",
            'token' => $token
        ];  
    }

    public function verify($request, $id, $token) {
        
        $user = User::findOrFail($id);

        if($user->hasVerifiedEmail()) {
            return "email deja verifé";
        }

        $user->markEmailVerified();

        return "Verification reussie";
    }

    public function logout() {
        /** @var \App\Models\User|null $user */
        $user = Auth::user();

        if(!$user) {
            return [
                "success" => false, 
                "message" => "utilisateur non connecté"
            ];
        }

        /** @var \Laravel\Sanctum\PersonalAccessToken $token */

        $token = $user->currentAccessToken();
        $token->delete();

        return [
            "success" => true,
            "message" => "Deconnexion reussie"
        ];
    }
}
