<?php

namespace App\Models;

class Proficiency extends Model {
    
    /**
     * get core proficiencies
     */
    static function core($columns = ['*'])
    {
        return self::all($columns)->where('type', 'CORE');
    }
    
    /* -----------------------------------------------------*\
     * Relations
     * ----------------------------------------------------- */

    function features() 
    {
        return $this->morphToMany('Gaminizer\Feature', 'featureable');
    }
    
}
