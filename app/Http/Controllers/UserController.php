<?php

namespace App\Http\Controllers;

class UserController extends Controller {
    
    public $timestamps = false; // don't try to insert timestamps by default
    
    /**
     * Show user creation form
     */
    function create()
    {
        return view('create_user', ['csrf_token' => csrf_token()]);
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
}
