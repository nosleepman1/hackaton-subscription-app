<?php

namespace App\Policies;

use App\Models\Admin;
use App\Models\Project;
use App\Models\User;
use Illuminate\Contracts\Auth\Authenticatable;

class ProjectPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(?Authenticatable $user): bool
    {
        return true;
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(?Authenticatable $user, Project $project): bool
    {
        return true;
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(Authenticatable $user): bool
    {
        return $user instanceof Admin;
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(Authenticatable $user, Project $project): bool
    {
        return $user instanceof Admin;
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(Authenticatable $user, Project $project): bool
    {
        return $user instanceof Admin;
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(Authenticatable $user, Project $project): bool
    {
        return false;
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(Authenticatable $user, Project $project): bool
    {
        return false;
    }
}
