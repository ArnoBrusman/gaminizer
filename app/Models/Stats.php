<?php

namespace App\Models;

use Gaminizer\Characters\StatModifier;

/**
 * TODO: Put Statistic business logic in here
 */
class Stats {

    static $stat_types = [];
    
    static function statTypes($type_preg = NULL) {
        if (empty(self::$stat_types)) {
            $types = statModifier::all('type');
            foreach ($types as $type) {
                self::$stat_types[] = $type['type'];
            }
        }

        if (!is_null($type_preg)) {
            $types = preg_grep($type_preg, self::$stat_types);
        } else {
            $types = self::$stat_types;
        }

        return $types;
    }

}
