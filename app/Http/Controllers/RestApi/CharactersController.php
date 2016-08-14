<?php

namespace App\Http\Controllers\RestApi;

use App\Http\Controllers\Controller;
use App\Http\Requests;
use Illuminate\Http\Request;

use Gaminizer\Character;

class CharactersController extends Controller
{
    
    function index($action, $variable)
    {
        return $this->$action($variable);
    }
    
    //-----------------------------------------------------
    // Getters
    //-----------------------------------------------------
    
    /**
     * return character(s) json
     * @param type $id
     */
    function characters($id)
    {
        $character = Character::all();
        
//        echo '<pre>' . print_r($character->toJson(), true) . '</pre>';
//        exit;
        
        return $character->toJson();
//        Response::macro(['json?' => 'what?']);
        
    }
  
}
