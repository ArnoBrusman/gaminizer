<?php

namespace Gaminizer\Characters;

use Gaminizer\Feature as BaseFeature;

class Feature extends Model {

    var $table = 'pc_features';

    /* -----------------------------------------------------*\
     * Relations
     * ----------------------------------------------------- */

    function coreFeature()
    {
        return $this->hasOne(BaseFeature::class);
    }

}
