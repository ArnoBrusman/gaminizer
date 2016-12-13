<?php

namespace Gaminizer;

class Narrative extends Model {
    
    /**
     * get core narratives
     */
    static function core($columns = ['*'])
    {
        return self::all($columns)->where('type', 'CORE');
    }
    
    //======================================================================
    // RELATIONS
    //======================================================================
    
    function classes()
    {
        return $this->belongsToMany(CharacterClass::class, 'narrative_classes', null, 'class_id')->withPivot('oddity');
    }
    
    function races()
    {
        return $this->belongsToMany(Race::class, 'narrative_races');
    }
}
