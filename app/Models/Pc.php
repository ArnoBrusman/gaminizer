<?php

namespace App\Models;

use App\Collections\PcCollection;

class Pc extends Model {

    //======================================================================
    // GETTERS
    //======================================================================

    //-----------------------------------------------------
    // Misc Getters
    //-----------------------------------------------------

    function get_level($result) {
        $level = 0;

        $pc_classes = $this->get_related($result, 'pc_classes');

        foreach ($pc_classes as $pc_class) {
            $level += $pc_class['level'];
        }
        return $level;
    }

    function get_languages($result) {
        $pc_features = $this->get_many_on_many($result, 'pc_features', 'feature');

        $languages = array();
        foreach ($pc_features as $key => $feature) {
            if ($feature['type'] === 'LNG') {
                $languages[$key] = $feature['name'];
            }
        }

        return $languages;
    }

    function get_speeds($result, $elaborate = false) {
        $speeds = $this->get_stats($result, 'SPD.*', $elaborate);

        return $speeds;
    }

    function get_sights($result) {
        $pc_features = $this->get_many_on_many($result, 'pc_features', 'feature');

        $sights = array();
        foreach ($pc_features as $key => $features) {
            if (substr($features['type'], 0, 3) === 'VSN') {
                $vision = substr($features['type'], 4);
                $sights[$vision] = $features['value'];
            }
        }

        return $sights;
    }

    function get_classes() {
        return $this->classes();
    }

    function get_ability_modifiers($result, $elaborate = FALSE) {
        $ability_scores = $this->get_ability_scores($result, $elaborate);
        $ability_modifiers = array();
        foreach ($ability_scores as $key => $as) {
            $ability_modifiers[$key] = calc_ability_mod($as);
        }
        return $ability_modifiers;
    }

    function get_saves($result, $elaborate = false) {
        $saves_atr = config_item('ability_scores');
        $saves = array();
        $saves_stats = $this->get_stats($result, 'SAV_.*', $elaborate);

        foreach ($saves_atr as $atr) {
            if (isset($saves_stats['SAV_' . $atr])) {
                $saves[$atr] = $saves_stats['SAV_' . $atr];
            } else {
                $saves[$atr] = 0;
            }
        }
        return $saves;
    }

    /**
     * returns an array with each entry containing data
     * 
     * @param type $result
     */
    function get_proficiencies($result, $type = NULL) {
        
    }

    /**
     * 
     * @param type $result
     * @param type $elaborate If set to true, each type will return an array 
     * with all the factoring 
     * @param type $type 
     * @return type
     */
    function getStatsResult($type = NULL) {
        return $this->statModifiers->statModifiersResults();
    }
    function statsResults($type = NULL) {
        return $this->statModifiers->statModifiersResults();
    }

    /**
     * 
     * @param type $result
     * @param type $include_ribbon  Include ribbon skills in the results. If set to 'only'
     * than only ribbon skills will be given
     * @param type $elaborate
     */
    function get_skill_scores($result, $include_ribbon = false, $elaborate = false) {
        if ($include_ribbon === 'only') {
            $type = 'RSKL';
        } elseif ($include_ribbon) {
            $type = '?SKL';
        } else {
            $type = 'CSKL';
        }

        $skills = $this->get_stats($result, $type . '_.*');

        if ($include_ribbon !== 'only') {
            $core_skills = config_item('core_skills');
            foreach ($core_skills as $value) {
                if (!isset($skills['CSKL_' . $value])) {
                    $skills['CSKL_' . $value] = 0;
                }
            }
        }
        return $skills;
    }

    function get_features($result, $type = NULL) {
        $pcf_cand = $this->_get_pc_property($result['ID'], 'features');
        if (!$pcf_cand) {
            $pc_features = $this->get_many_on_many($result, 'pc_features', 'feature', array('used', 'origin'));
            $this->_set_pc_atr($result['ID'], 'features', $pc_features);
        } else {
            $pc_features = $pcf_cand;
        }
        $features = array();
        foreach ($pc_features as $key => $feature) {
            if (!is_null($type) && !preg_match('/' . $type . '/', $feature['type'])) {
                continue;
            }
            $features[$feature['ID']] = $feature;
        }

        return $features;
    }

    private function _set_pc_atr($pid, $atr, $val = NULL) {
        $this->$atr[$pid] = $val;
    }

    function get_ac($result) {
        $AC_stats = $this->get_stats($result, 'AC');

        if (empty($AC_stats)) {
            $ac_val = 10;
        } else {
            if (isset($AC_stats['AC_BASE'])) {
                $ac_val = $AC_stats['AC_BASE'];
            } else {
                $ac_val = 10;
            }
            $ac_val += $AC_stats['AC'];
        }

        return $ac_val;
    }

    function get_initiative($result) {
        $init_stats = $this->get_stats($result, 'INI');

        if (empty($init_stats)) {
            $ini_val = 0;
        } else {
            $ini_val = $init_stats['INI'];
        }

        return $ini_val;
    }

    /**
     * 
     * 
     */
    function get_health($result, $elaborate = false) {
        $hp_data = $this->get_stats($result, '(HP.*)', $elaborate);
        if (empty($hp_data)) {
            $hp_data['HP_MAX'] = 0;
        }
        return $hp_data;
    }

    function get_hit_dice($result) {
        $hit_dice_data = $this->get_stats($result, 'HTD.*');

        $hit_dice = array();
        foreach ($hit_dice_data as $type => $value) {
            $die_type = preg_filter('/^HTD_(\d*).*/', '$1', $type);
            $used = preg_match('/_USD&*/', $type);

            if ($used === 1) {
                $hit_dice[$die_type]['used'] = $value;
            } else {
                $hit_dice[$die_type]['max'] = $value;
            }
        }

        return $hit_dice;
    }

    function get_death_saves($result) {
        $death_data = $this->get_stats($result, 'DTH.*');

        $death_results = array();
        $death_results['successes'] = isset($death_data['DTH_SCS']) ? $death_data['DTH_SCS'] : 0;
        $death_results['failures'] = isset($death_data['DTH_FAIL']) ? $death_data['DTH_FAIL'] : 0;

        return $death_results;
    }

    function get_proficiency_bonus($result) {
        $level = $this->get_level($result);
        $proficiency_bonus = round($level / 4, 0, PHP_ROUND_HALF_UP) + 1;
        return $proficiency_bonus;
    }

    function has_inspiration($result) {
        if (empty($inspiration_stats)) {
            $has_inspiration = false;
        } else {
            $has_inspiration = $inspiration_stats['INSPN'];
        }
        return $has_inspiration;
    }

    function get_exhaustion($result) {
        $exhaustion_data = $this->get_stats($result, 'EXH');
        if (empty($inspiration_stats)) {
            $exhaustion = 0;
        } else {
            $exhaustion = $exhaustion_data['EXH'];
        }
        return $exhaustion;
    }

    /**
     * Gets an array with spell slot data (not including what spells can be cast
     * with it.)
     * TODO: include an option to include spells in the data
     * 
     * @param type $result
     * @return type
     */
    function get_spell_slots($result) {
        $spellfeatures = $this->get_spellfeatures($result, 'SPSL');

        $sort_by_level = function($a, $b) {
            if ($a['level'] > $b['level']) {
                return true;
            } else {
                return false;
            }
        };
        usort($spellfeatures, $sort_by_level);
        return $spellfeatures;
    }

    function get_spellfeatures($result, $type = NULL) {
        $spellfeatures = $this->get_many_on_many($result, 'pc_features', 'spellsfeature', array('used', 'origin'));
        $features = array();
        foreach ($spellfeatures as $spellfeature) {
            if (!is_null($type) && !preg_match('/' . $type . '/', $spellfeature['type'])) {
                continue;
            }
            $features[$spellfeature['ID']] = $spellfeature;
        }

        return $features;
    }

    function get_action_features($result) {
        return $this->get_features($result, 'ACT');
    }

    function get_possesions($result, $type = NULL) {
        $pcf_cand = $this->_get_pc_property($result['ID'], 'possessions');
        if (!$pcf_cand) {
            $possesions = $this->get_many_on_many($result, 'pc_possessions', 'item', array('equiped', 'carried', 'origin'));
            $this->_set_pc_atr($result['ID'], 'possessions', $possesions);
        } else {
            $possesions = $pcf_cand;
        }
        $items = array();
        foreach ($possesions as $key => $item) {
            if (!is_null($type) && !preg_match('/' . $type . '/', $item['type'])) {
                continue;
            }
            $items[$item['ID']] = $item;
        }

        return $items;
    }

    function get_weapons($result, $type = NULL) {
        $weapon_items = $this->get_many_on_many($result, 'pc_possessions', 'weapon', array('equiped', 'carried', 'origin'));
        $weapons = array();
        foreach ($weapon_items as $weapon) {
            if (!is_null($type) && !preg_match('/' . $type . '/', $weapon['type'])) {
                continue;
            }
            $weapons[$weapon['ID']] = $weapon;
        }

        return $weapons;
    }

    public function newCollection(array $models = []) {
        return new PcCollection($models);
    }

    /**
     * get a property of a single pc.
     * 
     * @param type $pid pc ID
     * @param type $property atribute
     * @param type $key If set and if the 
     * attribute is an array, gets a specific key of the atribute, .
     * @return mixed Returns the attribute if it exists, or false if it doesn't.
     */
    private function _get_pc_property($pid, $property, $key = NULL) {
        if (isset($this->{$property}[$pid])) {
            $player_atr = $this->{$property}[$pid];
        } else {
            $player_atr = false;
        }
        if (!is_null($key) && is_array($player_atr[$key]) && isset($player_atr[$key])) {
            $player_atr = $player_atr[$key];
        } else {
            $player_atr = false;
        }

        return $player_atr;
    }

    //-----------------------------------------------------
    // Relations
    //-----------------------------------------------------

    function statModifiers() {
        return $this->hasMany(StatModifier::class);
    }

    function classes() {
        return $this->hasOne(CharacterClass::class);
    }

    function features() {
        return $this->hasMany(Feature::class);
    }

    function narrative() {
        return $this->hasOne(Narrative::class);
    }

    function possessions() {
        return $this->hasMany(Possession::class);
    }

    function proficiencies() {
        return $this->hasMany(Proficiency::class);
    }
    
}
