<?php

namespace Gaminizer;


class Race extends Model
{
    
    /**
     * get core races
     */
    static function core($columns = ['*'])
    {
        return self::all($columns)->where('type', 'CORE');
    }
}
