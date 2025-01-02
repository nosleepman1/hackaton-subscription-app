<?php

use App\Models\User;
use App\Models\Admin;
use App\Models\Theme;
use App\Models\Project;

beforeEach(function () {
    $this->theme = Theme::factory()->create();
});

it('allows guests to retrieve the list of projects', function () {
    Project::factory()->count(3)->create([
        'theme_id' => $this->theme->id,
    ]);

    $response = $this->getJson('/api/v1/projects');

    $response->assertStatus(200)
        ->assertJsonCount(3, 'data');
});

it('prevents standard authenticated users from creating a project', function () {
    $user = User::factory()->create();

    $response = $this->actingAs($user, 'sanctum')
        ->postJson('/api/v1/projects', [
            'name' => 'Innovative Project',
            'description' => 'A project that solves a big problem.',
            'theme_id' => $this->theme->id,
        ]);

    $response->assertStatus(403);
});

it('prevents standard authenticated users from updating a project', function () {
    $user = User::factory()->create();
    $project = Project::factory()->create([
        'theme_id' => $this->theme->id,
    ]);

    $response = $this->actingAs($user, 'sanctum')
        ->putJson("/api/v1/projects/{$project->id}", [
            'name' => 'Updated Name',
            'description' => 'Updated description.',
            'theme_id' => $this->theme->id,
        ]);

    $response->assertStatus(403);
});

it('prevents standard authenticated users from deleting a project', function () {
    $user = User::factory()->create();
    $project = Project::factory()->create([
        'theme_id' => $this->theme->id,
    ]);

    $response = $this->actingAs($user, 'sanctum')
        ->deleteJson("/api/v1/projects/{$project->id}");

    $response->assertStatus(403);
});

it('allows admin users to successfully create a project', function () {
    $admin = Admin::create([
        'name' => 'Admin User',
        'email' => 'admin@example.com',
        'password' => bcrypt('password'),
    ]);

    $response = $this->actingAs($admin, 'sanctum')
        ->postJson('/api/v1/projects', [
            'name' => 'Admin Project',
            'description' => 'Created by admin.',
            'theme_id' => $this->theme->id,
        ]);

    $response->assertStatus(200)
        ->assertJson([
            'message' => 'Projet créé avec succès',
        ])
        ->assertJsonPath('project.name', 'Admin Project');

    $this->assertDatabaseHas('projects', [
        'name' => 'Admin Project',
        'theme_id' => $this->theme->id,
    ]);
});

it('allows admin users to successfully update a project', function () {
    $admin = Admin::create([
        'name' => 'Admin User',
        'email' => 'admin@example.com',
        'password' => bcrypt('password'),
    ]);

    $project = Project::factory()->create([
        'theme_id' => $this->theme->id,
    ]);

    $response = $this->actingAs($admin, 'sanctum')
        ->putJson("/api/v1/projects/{$project->id}", [
            'name' => 'Updated by Admin',
            'description' => 'New description.',
            'theme_id' => $this->theme->id,
        ]);

    $response->assertStatus(200)
        ->assertJson([
            'message' => 'Projet modifié avec succès',
        ])
        ->assertJsonPath('project.name', 'Updated by Admin');

    $this->assertDatabaseHas('projects', [
        'id' => $project->id,
        'name' => 'Updated by Admin',
    ]);
});

it('allows admin users to successfully delete a project', function () {
    $admin = Admin::create([
        'name' => 'Admin User',
        'email' => 'admin@example.com',
        'password' => bcrypt('password'),
    ]);

    $project = Project::factory()->create([
        'theme_id' => $this->theme->id,
    ]);

    $response = $this->actingAs($admin, 'sanctum')
        ->deleteJson("/api/v1/projects/{$project->id}");

    $response->assertStatus(200)
        ->assertJson([
            'message' => 'Projet supprimé avec succès',
        ]);

    // Check soft delete / hard delete depending on model setup
    // Since Project model doesn't necessarily have SoftDeletes, but let's check
    // Wait, let's verify if the database has it deleted or not.
    // If deleted_at is a column or if it's hard deleted.
    // We can just verify it is deleted from the table or has deleted_at set.
    // We can do: $this->assertNull(Project::find($project->id));
    $this->assertNull(Project::find($project->id));
});
