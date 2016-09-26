<?php

namespace Gaminizer\Characters;

use Gaminizer\CharacterClass as BaseCharacterClass;

class CharacterClass extends Model {

    var $table = 'pc_classes';

    /* -----------------------------------------------------*\
     * Relations
     * -----------------------------------------------------*/
    
   function coreClass()
   {
       return $this->hasOne(BaseCharacterClass::class);
   }
    
}
