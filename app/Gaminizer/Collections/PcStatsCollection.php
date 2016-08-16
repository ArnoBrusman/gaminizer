<?php

namespace Gaminizer\Collections;

//use App\CustomCollection;
use Illuminate\Database\Eloquent\Collection;

/**
 * Description of PcStatsCollection
 *
 * @author Brusman
 */
class PcStatsCollection extends Collection {
    
    
    /**
     * calculates the final result of a type based on search results.
     * 
     * @param type $result
     * @param type $type_preg Regular expression that matches the type
     * @param type $elaborate If set to true, will return an array with all 
     * results of the type instead of calculating the final result
     * @return array
     */
    function calc_stat_type_value($type_preg) 
    {
        $endstat = 0;
        // array( ovrr_type => ovrr_value
        $override_data = array();
        foreach ($this as $stat) {
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

    
}
