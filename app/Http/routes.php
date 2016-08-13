<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::get('/', function () {
    return view('welcome');
});

//Route::get('character/{id}', function(App\Character $character) {
//  return view('character', $character);
//  echo 'hello #' . $character->id;
//});
Route::any('sheet/{id}', 'SheetController@showCharacter');
//Route::any('character/{id}', /*'CharacterController@showCharacter'*/ function($id){ echo 'hello # '.$id; });
//Route::any('character/{id}', function(App\Character $user){  echo '<pre>' . print_r($user, true) . '</pre>'; });