<?php

namespace Gaminizer;

class Action extends Model {
    
    /* -----------------------------------------------------*\
     * Relations
     * ----------------------------------------------------- */

    function features() 
    {
        return $this->morphToMany('Gaminizer\Feature', 'featureable');
    }

}
