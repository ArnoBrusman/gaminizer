<?php

namespace App\Http\Controllers\RestApi;

use App\Http\Controllers\Controller;
use App\Http\Requests;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\Collection;

use Gaminizer\Pc;

class CharactersController extends RestApiController
{
    
    function test()
    {
        // call /characters/test for this function
    }


    //-----------------------------------------------------
    // Getters
    //-----------------------------------------------------
    
    function getAll()
    {
        // get only foreign IDs to not overload client JS
        $data = Pc::with(['pcFeatures', 'pcClasses', 'stats'])->get();
        
        return response($data)->header('Content-type', 'application/json');
    }

    function getOne($id)
    {
        $responseData = Pc::find($id)->toJson();
        return response($responseData)->header('Content-type', 'application/json');
    }
  
    /**
     * TODO: make 'elaborate' work somehow
     * @param type $elaborate
     */
    function ability_scores($id = NULL) 
    {
        
        $elaborate = $this->request->input('elaborate');

        if($id !== NULL) {
            $characters = Pc::find($id);
        } else {
            $characters = Pc::all();
        }
        
        foreach($characters as $character) {
            $data = $character->get_ability_scores($elaborate);
        }
        
        return response($data)->header('Content-type', 'application/json');
    }
  
    function stats($id = NULL)
    {
        $elaborate = $this->request->input('elaborate');
        $type = $this->request->input('type');

        if(!is_numeric($id)) {
            $characters = Pc::all();
        } else {
            $characters = Pc::find($id);
        }
        if($characters instanceof Collection) {
            $data = array();
            foreach($characters as $character) {
                $stats = $character->get_stats($type, $elaborate);
                
                $stats['id'] = $character['id'];
                $data[] = $stats;
            }
        } else {
            $data = $characters->get_stats($type, $elaborate);
        }
        
        return response($data)->header('Content-type', 'application/json');
    }
  
    function classes($id = NULL)
    {
        $elaborate = $this->request->input('elaborate');
        $type = $this->request->input('type');

        if($id !== NULL) {
            $characters = Pc::find($id); // get model
        } else {
            $characters = Pc::all(); // get collection
        }
        
        if($characters instanceof Collection) {
            foreach($characters as $character) {
                $data = $character->get_classes($type, $elaborate)
                        ->getResults()->toJson();
            }
        } else {
            $data = $characters->get_classes($type, $elaborate)
                    ->getResults()->toJson();
        }
        
        return response($data)->header('Content-type', 'application/json');
    }
            
    function hr_stats()
    {
      $data = config('character.hr_stats');
      
      return response($data)->header('Content-Type', 'application/json');
    }
    
}
