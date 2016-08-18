<?php

namespace App\Http\Controllers\RestApi;

use Gaminizer\PcStats;

class PcStatsController extends RestApiController {
    
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
    
}
