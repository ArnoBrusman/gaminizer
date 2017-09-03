<?php

namespace App\Models\Characters;

use Gaminizer\Collections\PcStatsCollection;

class StatModifier extends Model
{
    var $table = 'pc_statmodifiers';
    static $stat_types = [];
    
    static function statTypes($type_preg = NULL)
    {
        if (empty(self::$stat_types )) {
            $types = self::all('type');
            foreach ($types as $type) {
                self::$stat_types[] = $type['type'];
            }
        }
        
        if(!is_null($type_preg)) {
          $types = preg_grep($type_preg, self::$stat_types);
        } else {
          $types = self::$stat_types;
        }

        return $types;
    }
  
    public function newCollection(array $models = [])
    {
        return new PcStatsCollection($models);
    }
    
}
