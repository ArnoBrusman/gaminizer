<?php

namespace App\Http\Controllers\RestApi;

use App\Http\Controllers\Controller;
use App\Http\Requests;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\Collection;

use Gaminizer\CharacterClass;

class ClassesController extends RestApiController
{
    
    //-----------------------------------------------------
    // Getters
    //-----------------------------------------------------
    
    function getAll()
    {
        $responseData = CharacterClass::all()->toJson();
        return response($responseData)->header('Content-type', 'application/json');
    }

    function getOne($id)
    {
        $responseData = CharacterClass::find($id)->toJson();
        return response($responseData)->header('Content-type', 'application/json');
    }
    
}
