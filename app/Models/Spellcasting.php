<?php

namespace App\Models;


class Spellcasting extends Model
{
    
    /**
     * get the spellfeature data combined with the feature data
     */
    function getCombinedData()
    {
            
    }
    
    //-----------------------------------------------------
    // Relations
    //-----------------------------------------------------
    
    function features() 
    {
        return $this->morphToMany('Gaminizer\Feature', 'featureable');
    }
    
}
