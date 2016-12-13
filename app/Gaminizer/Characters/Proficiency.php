<?php

namespace Gaminizer\Characters;

use Gaminizer\Proficiency as BaseProficiency;

class Proficiency extends Model {

    var $table = 'pc_proficiencies';

    function coreProficiency()
    {
        return $this->hasOne(BaseProficiency::class);
    }

}
