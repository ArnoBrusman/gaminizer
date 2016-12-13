<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;

class SheetController extends Controller {
  
    var $viewmodels = array();
    
    function showCharacter($id)
    {

        return view('sheet');
      
    }
          
    function index($id)
    {
        return $this->showCharacter($id);
    }

    function sheet($character_id) {

      $pc_data = $this->pc_model->get_by_id($character_id, array('race'));

    }
    
    function init($character_id) {

        return view('init');

    }
  
}
