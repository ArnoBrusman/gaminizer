<?php

namespace App\Http\Controllers\RestApi;

use App\Http\Controllers\Controller;
use App\Http\Requests;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\Collection;

use Gaminizer\Feature;
use Gaminizer\SpellsFeature;

class FeaturesController extends RestApiController
{
    
    //-----------------------------------------------------
    // Getters
    //-----------------------------------------------------
    
    function index()
    {
//        $responseData = Feature::with('action','spellcasting','proficiencies','statModifiers')->get();
        $responseData = Feature::with('action','spellcasting','proficiencies','statModifiers')->get();
        return response($responseData)->header('Content-type', 'application/json');
    }

    function show($id)
    {
        $data = Feature::with('featureable')->find($id)->toJson();
        return response($data)->header('Content-type', 'application/json');
    }
    
    function spellsfeatures($id = NULL)
    {
        if($id !== NULL) {
            $model = SpellsFeature::find($id);
            if(is_null($model))
            {
                $data = '{}';
            } else {
                $model->feature->spellsfeature;
                $data = $model->feature;
            }
        } else {
            $data = SpellsFeature::with(['feature' => function($query) {
//                BUG: this query does not work...
//                $query->select(['feature.*', 'feature.name', 'feature.uses']);
            }])->get();
            
        }

//        return response('t')->header('Content-type', 'text/html');
        return response($data)->header('Content-type', 'application/json');
       
    }
    
}
