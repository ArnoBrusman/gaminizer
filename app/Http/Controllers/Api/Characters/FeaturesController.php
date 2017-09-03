<?php

namespace App\Http\Controllers\Api\Characters;

use Gaminizer\Characters\Pc;

class FeaturesController extends CharactersApiController {
    
    //-----------------------------------------------------
    // Getters
    //-----------------------------------------------------
    
    function index($pc_id)
    {
        $pc = Pc::find($pc_id);
        if($pc === NULL) abort(404);
        
        $stats = $pc->features->all();
        
        return response($stats)->header('Content-type', 'application/json');
    }
    
}
