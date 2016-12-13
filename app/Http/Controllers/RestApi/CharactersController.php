<?php

namespace App\Http\Controllers\RestApi;

use Illuminate\Database\Eloquent\Collection;
use Gaminizer\Characters\Pc;
use App\Http\Controllers\RestApi\RestApiController;

class CharactersController extends RestApiController {
    
    function test()
    {
        // call /characters/test for this function
    }

    
    /* -----------------------------------------------------*\
     * Getters
     * -----------------------------------------------------*/
    
    /** Resource Getters **/
    
    function index()
    {
//      $pc = Pc::with(['pcFeatures', 'pcClasses', 'stats', 'proficiencies'])->find($id);
        $relation = Pc::with(['features', 'classes', 'statModifiers', 'proficiencies']);
        
        $collection = $relation->get();
        
        foreach ($collection as &$model) {
            $model->stats_results = $model->statModifiers->statsResults();
        }
        
        return response($collection)->header('Content-type', 'application/json');
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @return \Illuminate\Http\Response
     */
    public function store()
    {
        //
    }

    function show($id)
    {
//        $pc = Pc::with(['pcFeatures', 'pcClasses', 'stats', 'proficiencies'])->find($id);
        $relation = Pc::with(['features', 'classes', 'statModifiers', 'proficiencies']);
        
        $model = $relation->find($id);
        
        $model->stats_results = $model->statModifiers->statsResults();
        
        return response($model)->header('Content-type', 'application/json');
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }
    
    function update($id)
    {
        $success = false;
        $Pc = Pc::find($id);
        
        if ($this->request->isMethod('put') && $Pc->exists) {
            $input = $this->request->all();
            $success = $Pc->update($input);
            return response($Pc->toJson())->header('Content-type', 'application/json');
        } else {
            abort(404);
        }
    }
  
    function changeBatch()
    {
        return false;
    }
    
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
