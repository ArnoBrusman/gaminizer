<?php

namespace App\Http\Controllers\Api;

use Gaminizer\Narrative;

class NarrativesController extends ApiController {
    
    //-----------------------------------------------------
    // Getters
    //-----------------------------------------------------
    
    function index()
    {
        $responseData = Narrative::with(['classes', 'races'])->get();
        return response($responseData)->header('Content-type', 'application/json');
    }

    function show($id)
    {
        $responseData = Narrative::find($id);
        return response($responseData)->header('Content-type', 'application/json');
    }
    
    function update($id)
    {
        $narrative = Narrative::find($id);
//        if ($narrative->exists) {
            $input = $this->request->all();
//            $success = $narrative->update($input);
//            if ($success) {
//                return response($narrative)->header('Content-type', 'application/json');
//            }
//        }
        \Debugbar::info($input);
//        abort(500);
        return response($narrative)->header('Content-type', 'application/json');
    }
    
    /**
     * Store a newly created resource in storage.
     *
     * @return \Illuminate\Http\Response
     */
    public function store()
    {
        $input = $this->request->all();
        $narrative = new Narrative($input);
        $newNarrative = $narrative->save();
        if ($narrative->exists) {
            return response($narrative)->header('Content-type', 'application/json');
        } else {
            abort(500);
        }
    }

    public function delete($id)
    {
        $narrative = Narrative::find($id);
        if ($narrative->exists) {
            $success = $narrative->delete();
            if ($success) {
                return response(['status' => 'success'])->header('Content-type', 'application/json');
            }
        }
        
        abort(500);
    }
    
}
