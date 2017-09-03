<?php

namespace App\Http\Controllers\Api;

use Gaminizer\PcStats;

class PcStatsController extends ApiController {
    
    //-----------------------------------------------------
    // Getters
    //-----------------------------------------------------
    
    function getAll()
    {
        $responseData = PcStats::all()->toJson();
        return response($responseData)->header('Content-type', 'application/json');
    }

    function getOne($id)
    {
        $responseData = PcStats::find($id)->toJson();
        return response($responseData)->header('Content-type', 'application/json');
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
