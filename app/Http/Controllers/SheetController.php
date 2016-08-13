<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Gaminizer\Character;
use Template;

class SheetController extends Controller {
  
  var $viewmodels = array();
    
  function showCharacter($id)
  {
    $character = Character::find($id);
    
    $template = new Template\Template();
    $template->set_filename('header', 'header.tpl');
    return $template->p(TRUE);
    
//    return view('sheet', ['character' => $character]);
  }
          
  function index()
  {
    $this->add_viewmodel('index');
  }

  function sheet($character_id) {
    
    $pc_data = $this->pc_model->get_by_id($character_id, array('race'));
    
  }
  
}
