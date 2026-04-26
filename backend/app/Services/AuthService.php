<?php

namespace App\Services;

use App\Enums\Filiere;
use App\Enums\Grade;
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

        if ($user->hasVerifiedEmail()) {
            return [
                'success' => false,
                'message' => 'Cet email a déjà été vérifié.'
            ];
        }

        if (!hash_equals((string) $user->id, (string) $id) ||
            !hash_equals($user->email_verification_hash, $token)) {
            return [
                'success' => false,
                'message' => 'Lien de vérification invalide.'
            ];
        }

        $user->email_verified_at = now();
        $user->email_verification_hash = null;
        $user->save();

        return [
            'success' => true,
            'message' => 'Adresse email vérifiée avec succès.',
        ]; 
    }

    public function logout() {
        /**
         * @var \App\Models\User|null $user
         */
        $user = Auth::user();

        if (!$user) {
            return [
                "success" => false,
                "message" => "Utilisateur non connecté"
            ];
        }

        /** @var \Laravel\Sanctum\PersonalAccessToken|null $token */
        $token = $user->currentAccessToken();

        // Protection : si jamais currentAccessToken() retourne null
        if ($token) {
            $token->delete();
        }

        return [
            "success" => true,
            "message" => "Déconnexion réussie"
        ];  
    }


    public function grades() {
        return collect(Grade::cases())->map(fn ($case) => [
            "value" => $case->value,
            "label" => $case->label(),
        ]);
    }

    public function filieres() {
        return collect(Filiere::cases())->map(fn ($case) => [
            "value" => $case->value,
            "label" => $case->label(),
        ]);
    }
}
