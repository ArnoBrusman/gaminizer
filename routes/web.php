<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| This file is where you may define all of the routes that are handled
| by your application. Just tell Laravel the URIs it should respond
| to using a Closure or controller method. Build something great!
|
*/

//-----------------------------------------------------
// User Management Frontend Routes
//-----------------------------------------------------
Route::group(['prefix' => 'users'], function(){
    Route::get('create', 'UserController@create');
});

Auth::routes();
Route::group(['prefix' => 'auth', 'namespace' => 'auth'], function(){
    Route::get('login', 'LoginController@index');
});

//Route::post('login', 'LoginController@login');

//-----------------------------------------------------
// Sheet Routes
//-----------------------------------------------------

Route::any('sheet/{id}', 'SheetController@index');
Route::any('init/{id}', 'SheetController@init');

/* -----------------------------------------------------*\
 * Admin site
 * ----------------------------------------------------- */
Route::any('admin', 'Admin\\AdminController@admin');
Route::any('admin/{any}', 'Admin\\AdminController@any')->where('any', '.*');

//Route::get('admin', 'Admin\\AdminController@index')->name('admin');
Route::group([
    'as' => 'admin::',
    'namespace' => 'admin',
    'prefix' => 'admin',
        ], function() {
    
    Route::get('narratives', 'AdminController@narratives')->name('narratives');
    Route::get('races', 'AdminController@races')->name('races');
    Route::get('classes', 'AdminController@classes')->name('classes');
    Route::get('feats', 'AdminController@feats')->name('feats');
    Route::get('features', 'AdminController@features')->name('features');
//    Route::get('/', function(){        return response('test')->header('Content-type', 'text/html'); });
    Route::get('items', 'AdminController@feats')->name('items');
        // sub-items
    
    
});

//-----------------------------------------------------
// Debug routes
//-----------------------------------------------------
Route::any('test', 'TestController@test');
Route::any('phpinfo', function(){
    echo phpinfo();
});

Route::get('/home', 'HomeController@index');
