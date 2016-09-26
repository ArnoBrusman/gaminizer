<?php

namespace App\Http\Controllers\RestApi;

use Gaminizer\Proficiency;

class ProficienciesController extends RestApiController {

    //-----------------------------------------------------
    // Getters
    //-----------------------------------------------------

    function index()
    {
        $responseData = Proficiency::all();
        return response($responseData)->header('Content-type', 'application/json');
    }

    function show($id)
    {
        $responseData = Proficiency::find($id);
        return response($responseData)->header('Content-type', 'application/json');
    }

    function update($id)
    {
        $model = Proficiency::find($id);
        if ($model->exists) {
            $input = $this->request->all();
            $success = $model->update($input);
            if ($success) {
                return response($model)->header('Content-type', 'application/json');
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
        $model = new Proficiency($input);
        $newModel = $model->save();
        if ($model->exists) {
            return response($newModel)->header('Content-type', 'application/json');
        } else {
            abort(500);
        }
    }

    public function delete($id)
    {
        $model = Proficiency::find($id);
        if ($model->exists) {
            $success = $model->delete();
            if ($success) {
                return response(['status' => 'success'])->header('Content-type', 'application/json');
            }
        }

        abort(500);
    }

}
