<?php

use App\Models\User;
use App\Models\Admin;
use App\Models\Project;
use App\Models\Theme;
use App\Policies\ProjectPolicy;

beforeEach(function () {
    $this->policy = new ProjectPolicy();
    $this->theme = Theme::factory()->create();
    $this->project = Project::factory()->create([
        'theme_id' => $this->theme->id,
    ]);
});

it('allows guests and any users to view any projects', function () {
    $guest = null;
    $user = User::factory()->create();
    $admin = Admin::create([
        'name' => 'Admin User',
        'email' => 'admin@example.com',
        'password' => bcrypt('password'),
    ]);

    expect($this->policy->viewAny($guest))->toBeTrue();
    expect($this->policy->viewAny($user))->toBeTrue();
    expect($this->policy->viewAny($admin))->toBeTrue();
});

it('allows guests and any users to view a specific project', function () {
    $guest = null;
    $user = User::factory()->create();
    $admin = Admin::create([
        'name' => 'Admin User',
        'email' => 'admin@example.com',
        'password' => bcrypt('password'),
    ]);

    expect($this->policy->view($guest, $this->project))->toBeTrue();
    expect($this->policy->view($user, $this->project))->toBeTrue();
    expect($this->policy->view($admin, $this->project))->toBeTrue();
});

it('allows only admins to create projects', function () {
    $user = User::factory()->create();
    $admin = Admin::create([
        'name' => 'Admin User',
        'email' => 'admin@example.com',
        'password' => bcrypt('password'),
    ]);

    expect($this->policy->create($user))->toBeFalse();
    expect($this->policy->create($admin))->toBeTrue();
});

it('allows only admins to update projects', function () {
    $user = User::factory()->create();
    $admin = Admin::create([
        'name' => 'Admin User',
        'email' => 'admin@example.com',
        'password' => bcrypt('password'),
    ]);

    expect($this->policy->update($user, $this->project))->toBeFalse();
    expect($this->policy->update($admin, $this->project))->toBeTrue();
});

it('allows only admins to delete projects', function () {
    $user = User::factory()->create();
    $admin = Admin::create([
        'name' => 'Admin User',
        'email' => 'admin@example.com',
        'password' => bcrypt('password'),
    ]);

    expect($this->policy->delete($user, $this->project))->toBeFalse();
    expect($this->policy->delete($admin, $this->project))->toBeTrue();
});
