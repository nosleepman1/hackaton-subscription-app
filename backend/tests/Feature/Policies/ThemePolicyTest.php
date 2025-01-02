<?php

use App\Models\User;
use App\Models\Admin;
use App\Models\Theme;
use App\Policies\ThemePolicy;

beforeEach(function () {
    $this->policy = new ThemePolicy();
    $this->theme = Theme::factory()->create();
});

it('allows guests and any users to view any themes', function () {
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

it('allows guests and any users to view a specific theme', function () {
    $guest = null;
    $user = User::factory()->create();
    $admin = Admin::create([
        'name' => 'Admin User',
        'email' => 'admin@example.com',
        'password' => bcrypt('password'),
    ]);

    expect($this->policy->view($guest, $this->theme))->toBeTrue();
    expect($this->policy->view($user, $this->theme))->toBeTrue();
    expect($this->policy->view($admin, $this->theme))->toBeTrue();
});

it('allows only admins to create themes', function () {
    $user = User::factory()->create();
    $admin = Admin::create([
        'name' => 'Admin User',
        'email' => 'admin@example.com',
        'password' => bcrypt('password'),
    ]);

    expect($this->policy->create($user))->toBeFalse();
    expect($this->policy->create($admin))->toBeTrue();
});

it('allows only admins to update themes', function () {
    $user = User::factory()->create();
    $admin = Admin::create([
        'name' => 'Admin User',
        'email' => 'admin@example.com',
        'password' => bcrypt('password'),
    ]);

    expect($this->policy->update($user, $this->theme))->toBeFalse();
    expect($this->policy->update($admin, $this->theme))->toBeTrue();
});

it('allows only admins to delete themes', function () {
    $user = User::factory()->create();
    $admin = Admin::create([
        'name' => 'Admin User',
        'email' => 'admin@example.com',
        'password' => bcrypt('password'),
    ]);

    expect($this->policy->delete($user, $this->theme))->toBeFalse();
    expect($this->policy->delete($admin, $this->theme))->toBeTrue();
});
