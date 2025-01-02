<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Models\Team;
use App\Models\TeamMate;

class Member extends Model
{
    use SoftDeletes;
    protected $fillable = [
        'user_id',
        'team_mate_id',
        'team_id',
    ];

    public function team()
    {
        return $this->belongsTo(Team::class);
    }

    public function teamMate()
    {
        return $this->belongsTo(TeamMate::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
