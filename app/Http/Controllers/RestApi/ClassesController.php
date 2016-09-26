<?php

namespace App\Http\Controllers\RestApi;

use Gaminizer\CharacterClass;

class ClassesController extends RestApiController
{
    
    //-----------------------------------------------------
    // Getters
    //-----------------------------------------------------
    
    function index()
    {
        $responseData = CharacterClass::all();
        return response($responseData)->header('Content-type', 'application/json');
    }

    function show($id)
    {
        $responseData = CharacterClass::find($id);
        return response($responseData)->header('Content-type', 'application/json');
    }
    
    function update($id)
    {
        $class = CharacterClass::find($id);
        if ($class->exists) {
            $input = $this->request->all();
            $success = $class->update($input);
            if ($success) {
                return response($class)->header('Content-type', 'application/json');
            }
        }
        
        abort(500);
    }
    
    /**
     * Store a newly created resource in storage.
     *
     * @return \Illuminate\Http\Response
     */
    public function store()
    {
        $input = $this->request->all();
        $class = new CharacterClass($input);
        $newClass = $class->save();
        if ($class->exists) {
            return response($newClass)->header('Content-type', 'application/json');
        } else {
            abort(500);
        }
    }

    public function delete($id)
    {
        $class = CharacterClass::find($id);
        if ($class->exists) {
            $success = $class->delete();
            if ($success) {
                return response(['status' => 'success'])->header('Content-type', 'application/json');
            }
        }
        
        abort(500);
    }
    
}
