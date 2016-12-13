<?php

namespace Gaminizer;

class Feature extends Model
{
    
    function featureable()
    {
        return $this->morphTo('featureable');
    }
    
//    function spellsfeature() 
//    {
//        $relation = $this->hasOne('Gaminizer\SpellsFeature');
//        return $relation;
//    }
    function action()
    {
        return $this->morphedByMany('Gaminizer\Action', 'featureable');
    }
    
    function spellcasting()
    {
        return $this->morphedByMany('Gaminizer\Spellcasting', 'featureable');
    }
    
    function proficiencies()
    {
        return $this->morphedByMany('Gaminizer\Proficiency', 'featureable');
    }
    
    function statModifiers()
    {
        return $this->morphedByMany('Gaminizer\StatModifier', 'featureable');
    }
    
}
