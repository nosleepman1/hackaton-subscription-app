<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Project extends Model
{
    /** @use HasFactory<\Database\Factories\ProjectFactory> */
    use HasFactory, SoftDeletes;


    protected $fillable = [
        'name',
        'description',
        'theme_id',
    ];


    public function theme()
    {
        return $this->belongsTo(Theme::class);
    }



    public function teams()
    {
        return $this->hasMany(Team::class);
    }

    public function interesteds()
    {
        return $this->hasMany(Interested::class);
    }
}
