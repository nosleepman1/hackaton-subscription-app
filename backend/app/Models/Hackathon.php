<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Hackathon extends Model
{
    //
    protected $table = 'hackathons';
    protected $fillable = [
        'name',
        'description',
        'start_date',
        'end_date',
        'location'
    ];
}
