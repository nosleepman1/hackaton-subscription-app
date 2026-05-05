<?php

namespace App\Services;

use App\Enums\Filiere;
use App\Enums\Grade;
use App\Events\UserRegistered;
use App\Http\Resources\UserResource;
use App\Models\Admin;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthService
{
    public function register(array $data) {

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

    public function login(array $data) {

        $admin = Admin::where('email', $data['email'])->first();
       
        if ($admin && Hash::check($data['password'], $admin->password)) {
            $token = $admin->createToken('admin-token')->plainTextToken;
            return [
                "success" => true,
                "message" => "Connexion admin réussie",
                "token" => $token,
                "user" => $admin,
                "role" => "admin",
            ];
        }

        $user = User::where('email', $data['email'])->first();

        if(!$user || !Hash::check($data['password'], $user->password)) {
            return [
                "success" => false,
                "message" => "Adresse mail ou mot de passe incorrect"
            ];
        }

        $token = $user->createToken('auth-token')->plainTextToken;

        return [
            "success" => true,
            'message' => "Connexion réussie",
            'token' => $token,
            'user' => new UserResource($user),
            'role' => 'user',
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
            !hash_equals(sha1($user->getEmailForVerification()), (string) $token)) {
            return [
                'success' => false,
                'message' => 'Lien de vérification invalide.'
            ];
        }

        $user->markEmailAsVerified();

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
