<?php

use App\Models\User;
use App\Models\Admin;
use Illuminate\Support\Facades\Hash;

beforeEach(function () {
    // any general setup if needed
});

it('can register a new user successfully', function () {
    $response = $this->postJson('/api/v1/auth/register', [
        'firstname' => 'test',
        'lastname' => 'QAS',
        'email' => 'testeur@example.com',
        'password' => 'passer123',
        'phone' => '12345678',
        'grade' => 'L3',
        'filiere' => 'GL',
        'matricule' => 'MAT1234567',
    ]);

    $response->assertStatus(200)
        ->assertJson([
            'success' => true,
            'message' => 'Inscription reussie, verifiez votre mail',
        ]);

    $this->assertDatabaseHas('users', [
        'email' => 'testeur@example.com',
        'firstname' => 'test',
        'lastname' => 'QAS',
    ]);
});

it('fails to register user with already existing email', function () {
    User::factory()->create([
        'email' => 'duplicate@example.com',
    ]);

    $response = $this->postJson('/api/v1/auth/register', [
        'firstname' => 'Jane',
        'lastname' => 'Doe',
        'email' => 'duplicate@example.com',
        'password' => 'password123',
        'phone' => '87654321',
        'grade' => 'L3',
        'filiere' => 'GL',
        'matricule' => 'MAT8765432',
    ]);

    $response->assertStatus(422)
        ->assertJson([
            'message' => "L'email existe deja",
            'errors' => [
                'email' => ["L'email existe deja"]
            ]
        ]);
});

it('can login as a standard user with correct credentials', function () {
    $user = User::factory()->create([
        'firstname' => 'QA',
        'lastname' => 'test',
        'email' => 'testeur1@example.com',
        'password' => Hash::make('passer123'),
        'phone' => '221777777777',
        'grade' => 'L3',
        'filiere' => 'GL',
        'matricule' => 'MAT123456700',
    ]);

    $response = $this->postJson('/api/v1/auth/login', [
        'email' => 'testeur1@example.com',
        'password' => 'passer123',
    ]);

    $response->assertStatus(200)
        ->assertJson([
            'success' => true,
            'message' => 'Connexion réussie',
            'role' => 'user',
        ])
        ->assertJsonStructure([
            'token',
            'user' => [
                'id',
                'firstname',
                'lastname',
                'email',
            ],
        ]);
});

it('can login as an admin with correct credentials', function () {
    $admin = Admin::create([
        'name' => 'Admin User',
        'email' => 'admin@example.com',
        'password' => Hash::make('adminpassword'),
    ]);

    $response = $this->postJson('/api/v1/auth/login', [
        'email' => 'admin@example.com',
        'password' => 'adminpassword',
    ]);

    $response->assertStatus(200)
        ->assertJson([
            'success' => true,
            'message' => 'Connexion admin réussie',
            'role' => 'admin',
        ])
        ->assertJsonStructure([
            'token',
            'user' => [
                'id',
                'name',
                'email',
            ],
        ]);
});

it('fails to login with invalid credentials', function () {
    $response = $this->postJson('/api/v1/auth/login', [
        'email' => 'wrong@example.com',
        'password' => 'wrongpassword',
    ]);

    $response->assertStatus(200) // Returns 200 with success: false
        ->assertJson([
            'success' => false,
            'message' => 'Adresse mail ou mot de passe incorrect',
        ]);
});

it('can logout successfully when authenticated', function () {
    $user = User::factory()->create();
    
    $response = $this->actingAs($user, 'sanctum')
        ->postJson('/api/v1/auth/logout');

    $response->assertStatus(200)
        ->assertJson([
            'success' => true,
            'message' => 'Déconnexion réussie',
        ]);
});
