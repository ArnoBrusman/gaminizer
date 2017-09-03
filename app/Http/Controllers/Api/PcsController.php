<?php

namespace App\Http\Controllers\Api;

use Illuminate\Database\Eloquent\Collection;
use Gaminizer\Characters\Pc;

class PcsController extends Controller {
    
    var $model = 'Pc';
    
    protected $only = ['name','experience','description'];
    
    /** Misc Getters **/
    
    function stats($id)
    {
        $type = $this->request->input('type', NULL);
        $pc = Pc::find($id);
        $relation = $pc->stats();
        if(!is_null($type)) {
            $relation = $relation->where('type', $type);
        }
        $data = $relation->get();
        
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
