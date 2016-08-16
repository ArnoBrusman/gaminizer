<?php

namespace Gaminizer;

use Gaminizer\Collections\PcStatsCollection;
use Illuminate\Database\Eloquent\Model;

class PcStats extends Model
{
    
    static $stat_types = array();
    
    
    /**
     * calculates the final result of a type based on search results.
     * 
     * @param type $result
     * @param type $type_preg Regular expression that matches the type
     * @param type $elaborate If set to true, will return an array with all 
     * results of the type instead of calculating the final result
     * @return array
     */
    function calc_stat_type_value($result, $type_preg) 
    {
      $endstat = 0;
      // array( ovrr_type => ovrr_value
      $override_data = array();
      foreach ($result as $stat) {
        if(!preg_match('/^'.$type_preg.'$/', $stat['type'])) {
          continue;
        }

        if(!is_null($stat['override'])) {
          if($stat['override'] === 'minimum' && (
                  !key_exists('minimum',$override_data) ||
                  $override_data['minimum'] > $stat['value']
                    )) {
            $override_data['minimum'] = $stat['value'];
          }
          if($stat['override'] === 'maximimum' && (
                  !key_exists('maximimum',$override_data) ||
                  $override_data['maximimum'] < $stat['value']
                    )) {
            $override_data['maximimum'] = $stat['value'];
          }
          if($stat['override'] === 'hard') {
            $endstat = $stat['value'];
            // make sure it doesn't get overridden again
            $override_data = array();
            break;
          }
        } else {
          $endstat += $stat['value'];
        }
      }
      if(key_exists('minimum', $override_data)
            && $override_data['minimum'] > $endstat ) {
        $endstat = $override_data['minimum'];
      }
      if (key_exists('maximum', $override_data)
            && $override_data['maximum'] < $endstat) {
        $endstat = $override_data['maximum'];
      }
      return $endstat;
    }

    static function get_stat_types($type_preg = NULL)
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
