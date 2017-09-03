<?php

namespace App\Http\Controllers\Api\Characters;

use Gaminizer\Characters\Pc;

class StatsController extends CharactersApiController {
    
    //-----------------------------------------------------
    // Getters
    //-----------------------------------------------------
    
    function index($pc_id)
    {
        $pc = Pc::find($pc_id);
        if($pc === NULL) abort(404);
        
        $stats = $pc->statModifiers->all();
        
        return response($stats)->header('Content-type', 'application/json');
    }

    function getOne($pc_id, $stat_id)
    {
        $pc = Pc::find($pc_id);
        if($pc === NULL) abort(404);
        
        $stat = $pc->statModifiers->find($stat_id);
        
        return response($stat)->header('Content-type', 'application/json');
    }
    
    function updateOne($id)
    {
        $success = false;
        $PcStats = PcStats::find($id);
        
        if ($this->request->isMethod('put') && $PcStats->exists) {
            $input = $this->request->all();
            $success = $PcStats->update($input);
            return response($PcStats->toJson())->header('Content-type', 'text/html');
        } else
        {
            abort(404);
        }
    }
    
}
