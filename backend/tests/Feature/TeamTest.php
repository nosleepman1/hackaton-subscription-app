<?php

use App\Models\User;
use App\Models\Team;
use App\Models\Theme;
use App\Models\Project;
use App\Models\TeamMate;
use App\Models\Member;

beforeEach(function () {
    $this->user = User::factory()->create();
    $this->theme = Theme::factory()->create();
    $this->project = Project::factory()->create([
        'theme_id' => $this->theme->id,
    ]);
});

it('allows an authenticated user to successfully create a team', function () {
    $response = $this->actingAs($this->user, 'sanctum')
        ->postJson('/api/v1/teams', [
            'name' => 'Dream Team',
            'project_id' => $this->project->id,
        ]);

    $response->assertStatus(201)
        ->assertJson([
            'success' => true,
            'message' => 'Equipe ajoutée avec succès',
        ]);

    $this->assertDatabaseHas('teams', [
        'name' => 'Dream Team',
        'user_id' => $this->user->id,
        'project_id' => $this->project->id,
    ]);

    // Check that the captain was also added as a member of the team
    $team = Team::where('name', 'Dream Team')->first();
    $this->assertDatabaseHas('members', [
        'team_id' => $team->id,
        'user_id' => $this->user->id,
    ]);
});

it('allows an authenticated user to retrieve their own team', function () {
    $team = Team::create([
        'name' => 'User Team',
        'user_id' => $this->user->id,
        'project_id' => $this->project->id,
    ]);

    Member::create([
        'team_id' => $team->id,
        'user_id' => $this->user->id,
    ]);

    $response = $this->actingAs($this->user, 'sanctum')
        ->getJson('/api/v1/teams');

    $response->assertStatus(200)
        ->assertJson([
            'success' => true,
            'message' => 'Liste des équipes',
        ])
        ->assertJsonPath('data.team.name', 'User Team');
});

it('limits the number of team mates to 5 per team', function () {
    $team = Team::create([
        'name' => 'Bounded Team',
        'user_id' => $this->user->id,
        'project_id' => $this->project->id,
    ]);

    // Captain is 1st member
    Member::create([
        'team_id' => $team->id,
        'user_id' => $this->user->id,
    ]);

    // Add 4 more members to reach the limit of 5 members
    for ($i = 0; $i < 4; $i++) {
        $mate = TeamMate::create([
            'firstname' => 'Mate' . $i,
            'lastname' => 'Smith',
            'phone' => '555000' . $i,
            'email' => 'mate' . $i . '@example.com',
            'grade' => 'L3',
            'filiere' => 'GL',
            'matricule' => 'MATR000' . $i,
        ]);

        Member::create([
            'team_id' => $team->id,
            'team_mate_id' => $mate->id,
        ]);
    }

    $this->assertEquals(5, Member::where('team_id', $team->id)->count());

    // Trying to add the 6th member via the TeamMate controller endpoint should fail
    $response = $this->actingAs($this->user, 'sanctum')
        ->postJson('/api/v1/team-mates', [
            'firstname' => 'Extra',
            'lastname' => 'Smith',
            'phone' => '55500099',
            'email' => 'extra@example.com',
            'grade' => 'L3',
            'filiere' => 'GL',
            'matricule' => 'MATR00099',
        ]);

    $response->assertStatus(500)
        ->assertJson([
            'success' => false,
            'message' => 'Votre équipe a atteint le nombre maximum de membres (5).',
        ]);
});
