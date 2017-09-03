<?php

namespace App\Models;

class CharacterClass extends Model {
    
    protected $table = 'classes';
    
    /**
     * get core narratives
     */
    static function core($columns = ['*'])
    {
        return self::all($columns)->where('type', 'CORE');
    }
    
}
