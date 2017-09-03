<?php

namespace App\Http\Controllers\Api;

use Gaminizer\User;
use App\Http\Controllers\Api\ApiController;

class UsersController extends ApiController {
    
    /* -----------------------------------------------------*\
     * Getters
     * -----------------------------------------------------*/
    
    /** Resource Getters **/
    
    function index()
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
        $name = $this->request->get('name');
        $password = $this->request->get('password');
        $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
        
        // check if username already exists
        $existingUser = User::where(['name' => $name])->first();
        \Debugbar::info($existingUser);
        if($existingUser !== null) {
            abort(400, 'user already exists');
        }
        $newUser = new User(['name' => $name, 'password' => $hashedPassword]);
        $newUser->save();
        
        return response($newUser)->header('Content-type', 'application/json');
    }

    function show($id)
    {
        //
    }
    
    function update($id)
    {
        //
    }
  
    function changeBatch()
    {
        return false;
    }
    
}
