<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Gaminizer\Character;
use Gaminizer\SheetPage;
use Template;

class SheetController extends Controller {
  
    var $viewmodels = array();
    
    function showCharacter($id)
    {

//      $SheetPage = new SheetPage($id);

        return view('sheet');
      
//      return $SheetPage->render();

    }
          
    function index($id)
    {
        return $this->showCharacter($id);
    }

    function sheet($character_id) {

      $pc_data = $this->pc_model->get_by_id($character_id, array('race'));

    }
  
}
