<?php

namespace App\Http\Controllers\Api\Characters;

use Illuminate\Http\Request;
use App\Http\Controllers\Api\ApiController;

class CharactersApiController extends ApiController {
    
    var $pc;
    
    public function __construct(Request $request)
    {
        parent::__construct($request);
    }
    
}
