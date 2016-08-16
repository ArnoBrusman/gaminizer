<?php

namespace App\Http\Controllers\RestApi;

use App\Http\Controllers\Controller;
use App\Http\Requests;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\Collection;

use Gaminizer\Race;

class RacesController extends RestApiController {
    
    //-----------------------------------------------------
    // Getters
    //-----------------------------------------------------
    
    function getAll()
    {
        $responseData = Race::all()->toJson();
        return response($responseData)->header('Content-type', 'application/json');
    }

    function getOne($id)
    {
        $responseData = Race::find($id)->toJson();
        return response($responseData)->header('Content-type', 'application/json');
    }
    
}
