<?php

namespace App\Http\Controllers\RestApi\Characters;

use Gaminizer\Characters\Pc;

class ClassesController extends CharactersApiController {
    
    //-----------------------------------------------------
    // Getters
    //-----------------------------------------------------
    
    function index($pc_id)
    {
        $pc = Pc::find($pc_id);
        if($pc === NULL) abort(404);
        
        $stats = $pc->classes->all();
        
        return response($stats)->header('Content-type', 'application/json');
    }
    
}
