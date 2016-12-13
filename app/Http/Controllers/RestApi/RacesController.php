<?php

namespace App\Http\Controllers\RestApi;

use Gaminizer\Race;

class RacesController extends RestApiController {

    //-----------------------------------------------------
    // Getters
    //-----------------------------------------------------

    function index()
    {
        $responseData = Race::all();
        return response($responseData)->header('Content-type', 'application/json');
    }

    function show($id)
    {
        $responseData = Race::find($id);
        return response($responseData)->header('Content-type', 'application/json');
    }

    function update($id)
    {
        $race = Race::find($id);
        if ($race->exists) {
            $input = $this->request->all();
            $success = $race->update($input);
            if ($success) {
                return response($race)->header('Content-type', 'application/json');
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
        $race = new Race($input);
        $newRace = $race->save();
        if ($race->exists) {
            return response($newRace)->header('Content-type', 'application/json');
        } else {
            abort(500);
        }
    }

    public function delete($id)
    {
        $race = Race::find($id);
        if ($race->exists) {
            $success = $race->delete();
            if ($success) {
                return response(['status' => 'success'])->header('Content-type', 'application/json');
            }
        }

        abort(500);
    }

}
