<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Models\User;
use App\Models\Project;
use App\Models\Member;


class Team extends Model
{
    use SoftDeletes;
    protected $fillable = [
        'user_id',
        'project_id',
        'name',
    ];


  

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function project()
    {
        return $this->belongsTo(Project::class);
    }

    public function members()
    {
        return $this->hasMany(Member::class);
    }
}
