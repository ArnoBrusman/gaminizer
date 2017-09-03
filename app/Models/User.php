<?php

namespace App\Models;

use App\User as AppUser;

class User extends AppUser
{
    public $timestamps = false; // don't try to insert timestamps by default
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];
    
}
