<?php

namespace App\Http\Controllers\RestApi\Characters;

use Illuminate\Http\Request;
use App\Http\Controllers\RestApi\RestApiController;

class CharactersApiController extends RestApiController {
    
    var $pc;
    
    public function __construct(Request $request)
    {
        parent::__construct($request);
    }
    
}
