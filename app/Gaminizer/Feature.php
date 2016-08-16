<?php

namespace Gaminizer;

use Illuminate\Database\Eloquent\Model;

class Feature extends Model
{
    var $table = 'feature';
    //
    
    function featureable()
    {
        return $this->morphTo();
    }
    
//    function spellsfeature() 
//    {
//        $relation = $this->hasOne('Gaminizer\SpellsFeature');
//        return $relation;
//    }
}
