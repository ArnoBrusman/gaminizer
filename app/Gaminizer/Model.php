<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace Gaminizer;

use Illuminate\Database\Eloquent\Model as EloquentModel;

/**
 * Description of Model
 *
 * @author Premiums
 */
abstract class Model extends EloquentModel {
    
    protected $guarded = ['id'];
    public $timestamps = false; // don't try to insert timestamps by default
    
    
    function updateRelations($relationName, $relationsAttributes)
    {
        $syncArray = [];
        foreach ($relationsAttributes as $relationAttributes) {
            $syncArray[$relationAttributes['id']] = $relationAttributes['pivot'];
        }
        $this->$relationName()->sync($syncArray);
    }
    
}
