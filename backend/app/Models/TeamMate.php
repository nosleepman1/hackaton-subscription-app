<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Models\Member;

class TeamMate extends Model
{
    use SoftDeletes;
    protected $fillable = [
        'firstname',
        'lastname',
        'email',
        'phone',
        'matricule',
        'grade',
        'filiere',
    ];

    public function members()
    {
        return $this->hasMany(Member::class);
    }
}
