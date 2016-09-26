<?php

namespace Gaminizer;

class Narrative extends Model {
    
    /**
     * get core narratives
     */
    static function core($columns = ['*'])
    {
        return self::all($columns)->where('type', 'CORE');
    }
    
    //======================================================================
    // RELATIONS
    //======================================================================
    
    function classes()
    {
        return $this->belongsToMany(CharacterClass::class, 'narrative_classes', null, 'class_id')->withPivot('oddity');
    }
    
    function races()
    {
        return $this->belongsToMany(Race::class, 'narrative_races');
    }
    
    function features()
    {
        return $this->belongsToMany(Feature::class, 'narrative_features')->withPivot('level');
    }
    
    //======================================================================
    // RELATION FUNCTION
    //======================================================================
    
    function updateClasses($classesAttributes)
    {
        $this->updateRelations('classes', $classesAttributes);
    }
    
    function updateRaces($raceAttributes)
    {
        $this->updateRelations('races', $raceAttributes);
    }
    
    /**
     * Update relating features. Can create (and delete) features
     * @param type $featureAttributes
     */
    function manageFeatures($featureAttributes)
    {
        $syncArray = [];
        foreach ($featureAttributes as $featureAttributes) {
            $pivot = $featureAttributes['pivot'];
            unset($featureAttributes['pivot']);
            if(intval($featureAttributes['id']) === 0) {
                $feature = Feature::create($featureAttributes);
                $featureAttributes['id'] = $feature->id;
            } else {
                $feature = Feature::find($featureAttributes['id']);
                $feature->update($featureAttributes);
            }
            
            $syncArray[$feature->id] = $pivot;
        }
        $this->features()->sync($syncArray);
    }
    
}
