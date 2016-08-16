<?php

namespace Gaminizer;

use Illuminate\Database\Eloquent\Model;

class SpellsFeature extends Model
{
    var $table = 'spellsfeature';
    // 
    
    
    
    /**
     * get the spellfeature data combined with the feature data
     */
    function getCombinedData()
    {
        
    }
    
    //-----------------------------------------------------
    // Relations
    //-----------------------------------------------------
    
    function feature() {
        
//        $relation = $this->belongsTo('Gaminizer\Feature');
        $relation = $this->morphOne('Gaminizer\Feature', 'featureable');
                
        return $relation;
    }
    
}
