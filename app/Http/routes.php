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

//-----------------------------------------------------
// User Management Frontend Routes
//-----------------------------------------------------
Route::group(['prefix' => 'users'], function(){
    Route::get('create', 'UserController@create');
});
Route::get('login', 'LoginController@index');
Route::post('login', 'LoginController@login');

//-----------------------------------------------------
// Sheet Routes
//-----------------------------------------------------

Route::any('sheet/{id}', 'SheetController@index');
Route::any('init/{id}', 'SheetController@init');

/* -----------------------------------------------------*\
 * Admin site
 * ----------------------------------------------------- */
Route::group([
    'as' => 'admin::',
    'namespace' => 'admin',
    'prefix' => 'admin',
        ], function() {
    Route::get('/', 'AdminController@index');
//    Route::get('/', function(){        return response('test')->header('Content-type', 'text/html'); });
});
//-----------------------------------------------------
// Debug routes
//-----------------------------------------------------
Route::any('characters/test', 'RestApi\\CharactersController@test');
//Route::any('test/stats', function(){
//     $response = $this->call('POST', '/restapi/characters/stats',
//             ['elaborate' => TRUE]);
//});
Route::any('test', 'TestController@test');
Route::any('phpinfo', function(){
    echo phpinfo();
});
