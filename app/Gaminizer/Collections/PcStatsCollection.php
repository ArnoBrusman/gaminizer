<?php

namespace Gaminizer\Collections;

//use App\CustomCollection;
use Illuminate\Database\Eloquent\Collection;
use Gaminizer\PcStats;

/**
 * Description of PcStatsCollection
 *
 * @author Brusman
 */
class PcStatsCollection extends Collection {

    /**
     * calculates the final result of a type based on the models of a type in the
     * collection.
     * 
     * @param type $result
     * @param type $type_sreg Simplified regular expression that matches the type.
     * Simplified, meaning no delimiters and matches full string.
     * @param type $elaborate If set to true, will return an array with all 
     * results of the type instead of calculating the final result
     * @return array
     */
    function statTypeResult($type_sreg, $baseValue = 0)
    {
        //test regex
        if (@preg_match('%^' . $type_sreg . '$%', null) === false) {
            error_log('Bad Regex: the simplified regex \'' . $type_sreg . '\' did not run against null');
            return false;
        }
        // array( ovrr_type => ovrr_value

        $typeStats = $this->filter(function($stat) use ($type_sreg) {
            if (preg_match('%^' . $type_sreg . '$%', $stat->type)) {
                return true;
            } else {
                return false;
            }
        });
        $softMod = 0;
        $override_data = array();
        foreach ($typeStats as $stat) {
            if (!is_null($stat['override'])) {
                if ($stat['override'] === 'minimum' && (
                        !key_exists('minimum', $override_data) ||
                        $override_data['minimum'] > $stat['value']
                        )) {
                    $override_data['minimum'] = $stat['value'];
                }
                if ($stat['override'] === 'maximimum' && (
                        !key_exists('maximimum', $override_data) ||
                        $override_data['maximimum'] < $stat['value']
                        )) {
                    $override_data['maximimum'] = $stat['value'];
                }
                if ($stat['override'] === 'base' &&
                        // only change base value if it's higher
                        $stat['value'] > $baseValue) {
                    $baseValue = $stat['value'];
                }
                if ($stat['override'] === 'hard') {
                    $baseValue = $stat['value'];
                    // make sure it doesn't get adjusted or overridden
                    $softMod = 0;
                    $hardMod = 0;
                    $override_data = array();
                    break;
                }
            } else {
                $softMod += $stat['value'];
            }
        }
        $endresult = $baseValue + $softMod;
        if (key_exists('minimum', $override_data) && $override_data['minimum'] > $endresult) {
            $endresult = $override_data['minimum'];
        }
        if (key_exists('maximum', $override_data) && $override_data['maximum'] < $endresult) {
            $endresult = $override_data['maximum'];
        }


        return $endresult;
    }

    /**
     * calculate the final result of all existing stat types using statTypeResult.
     */
    function statsResults()
    {
        $statTypeResults = [];
        foreach ($this->types() as $type) {
            $statTypeResults[$type] = $this->statTypeResult($type);
        }
        return $statTypeResults;
    }

    function types()
    {
        return $this->pluck('type');
    }

}
