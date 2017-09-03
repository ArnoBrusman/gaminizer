<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\Collection;

use Gaminizer\Feature;

class SpellFeaturesController extends ApiController
{
    
    //-----------------------------------------------------
    // Getters
    //-----------------------------------------------------
    
    function getAll()
    {
        $responseData = Feature::all()->toJson();
        return response($responseData)->header('Content-type', 'application/json');
    }

    function getOne($id)
    {
        $responseData = Feature::find($id)->toJson();
        return response($responseData)->header('Content-type', 'application/json');
    }
    
    function spellsfeatures()
    {
        echo '<pre>' . print_r('here', true) . '</pre>';
        return;
//        $this->load->model('spellsfeature_model');
        if(is_numeric($this->uri->segment(3))) {
            $output = $this->spellsfeature_model->get_by_id($this->uri->segment(3));
        } else {
            $output = $this->spellsfeature_model->get();
        }

        echo json_encode($output);
        return response($responseData)->header('Content-type', 'application/json');
    }
    
}
