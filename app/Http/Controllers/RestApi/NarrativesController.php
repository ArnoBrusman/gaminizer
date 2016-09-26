<?php

namespace App\Http\Controllers\RestApi;

use Gaminizer\Narrative;

class NarrativesController extends RestApiController {
    
    //-----------------------------------------------------
    // Getters
    //-----------------------------------------------------
    
    function index()
    {
        $responseData = Narrative::with(['classes', 'races', 'features.spellcasting', 'features.statModifiers','features.proficiencies', 'features.action'])->get();
        return response($responseData)->header('Content-type', 'application/json');
    }

    function show($id)
    {
        $responseData = Narrative::find($id);
        return response($responseData)->header('Content-type', 'application/json');
    }
    
    /**
     * Updates the Narrative table and any given pivots.
     * 
     * @param type $id
     * @return type
     */
    function update($id)
    {
        $narrative = Narrative::find($id);
        if ($narrative->exists) {
            $classData = $this->request->get('classes');
            $raceData = $this->request->get('races');
            $featuresData = $this->request->get('features');
            \Debugbar::info($featuresData);
            
            //update class pivots
            if (!is_null($classData)) {
                $narrative->updateClasses($classData);
            }
            if (!is_null($raceData)) {
                $narrative->updateRaces($raceData);
            }
            if (!is_null($featuresData)) {
                $narrative->manageFeatures($featuresData);
            }
            
//            $success = $narrative->update($input);
//            if ($success) {
//                return response($narrative)->header('Content-type', 'application/json');
//            }
        }
//        abort(500);
        return response($narrative)->header('Content-type', 'application/json');
    }
    
    function updateClasses()
    {
        
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
