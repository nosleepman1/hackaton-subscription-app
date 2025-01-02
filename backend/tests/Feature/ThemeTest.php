<?php

use App\Models\User;
use App\Models\Admin;
use App\Models\Theme;

it('allows guests to retrieve the list of themes', function () {
    Theme::factory()->count(3)->create();

    $response = $this->getJson('/api/v1/themes');

    $response->assertStatus(200)
        ->assertJsonCount(3, 'data');
});

it('prevents standard authenticated users from creating a theme', function () {
    $user = User::factory()->create();

    $response = $this->actingAs($user, 'sanctum')
        ->postJson('/api/v1/themes', [
            'name' => 'Artificial Intelligence',
            'description' => 'AI in medical tech.',
        ]);

    $response->assertStatus(403);
});

it('prevents standard authenticated users from updating a theme', function () {
    $user = User::factory()->create();
    $theme = Theme::factory()->create();

    $response = $this->actingAs($user, 'sanctum')
        ->putJson("/api/v1/themes/{$theme->id}", [
            'name' => 'Updated Theme Name',
            'description' => 'Updated description.',
        ]);

    $response->assertStatus(403);
});

it('prevents standard authenticated users from deleting a theme', function () {
    $user = User::factory()->create();
    $theme = Theme::factory()->create();

    $response = $this->actingAs($user, 'sanctum')
        ->deleteJson("/api/v1/themes/{$theme->id}");

    $response->assertStatus(403);
});

it('allows admin users to successfully create a theme', function () {
    $admin = Admin::create([
        'name' => 'Admin User',
        'email' => 'admin@example.com',
        'password' => bcrypt('password'),
    ]);

    $response = $this->actingAs($admin, 'sanctum')
        ->postJson('/api/v1/themes', [
            'name' => 'Blockchain Solutions',
            'description' => 'Decentralized systems.',
        ]);

    $response->assertStatus(200)
        ->assertJson([
            'message' => 'Thème créé avec succès',
        ])
        ->assertJsonPath('theme.name', 'Blockchain Solutions');

    $this->assertDatabaseHas('themes', [
        'name' => 'Blockchain Solutions',
    ]);
});

it('allows admin users to successfully update a theme', function () {
    $admin = Admin::create([
        'name' => 'Admin User',
        'email' => 'admin@example.com',
        'password' => bcrypt('password'),
    ]);

    $theme = Theme::factory()->create();

    $response = $this->actingAs($admin, 'sanctum')
        ->putJson("/api/v1/themes/{$theme->id}", [
            'name' => 'Cybersecurity Theme',
            'description' => 'Securing corporate networks.',
        ]);

    $response->assertStatus(200)
        ->assertJson([
            'message' => 'Thème modifié avec succès',
        ])
        ->assertJsonPath('theme.name', 'Cybersecurity Theme');

    $this->assertDatabaseHas('themes', [
        'id' => $theme->id,
        'name' => 'Cybersecurity Theme',
    ]);
});

it('allows admin users to successfully delete a theme', function () {
    $admin = Admin::create([
        'name' => 'Admin User',
        'email' => 'admin@example.com',
        'password' => bcrypt('password'),
    ]);

    $theme = Theme::factory()->create();

    $response = $this->actingAs($admin, 'sanctum')
        ->deleteJson("/api/v1/themes/{$theme->id}");

    $response->assertStatus(200)
        ->assertJson([
            'message' => 'Thème supprimé avec succès',
        ]);

    $this->assertNull(Theme::find($theme->id));
});
