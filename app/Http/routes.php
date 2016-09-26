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
// Api Routes
//-----------------------------------------------------

Route::group(['as' => 'restapi::', 'namespace' => 'RestApi', 'prefix' => 'restapi'], function() {

    // Characters controller
    Route::resource('characters', 'CharactersController', ['parameters' => ['characters' => 'pc']]);
    Route::group(['as' => 'characters::', 'namespace' => 'Characters', 'prefix' => 'characters/{pc}'], function() {
        Route::get('stats', 'StatsController@index');
        Route::get('features', 'FeaturesController@index');
        Route::get('classes', 'ClassesController@index');
    });

    // Classes controller
    Route::any('classes', 'ClassesController@getAll');
    Route::any('classes/{id}', 'ClassesController@getOne');
    Route::any('classes/{id}/{any}', 'ClassesController@findData');
    Route::any('classes/{any}', 'ClassesController@allData');

    // Features controller
    Route::any('features', 'FeaturesController@index');
    Route::any('features/{id}', 'FeaturesController@show')
            ->where(['id' => '[0-9]+']);
    Route::any('features/{id}/{any}', 'FeaturesController@findData')
            ->where(['id' => '[0-9]+']);
    Route::any('features/{any}', 'FeaturesController@allData');

    // Races controller
    Route::any('races', 'RacesController@getAll');
    Route::any('races/{id}', 'RacesController@getOne');
    Route::any('races/{id}/{any}', 'RacesController@findData');
    Route::any('races/{any}', 'RacesController@allData');

    //-----------------------------------------------------
    // Stats Elaborate controller
    //-----------------------------------------------------
    Route::get('pcstats/', 'PcStatsController@getAll');
    Route::get('pcstats/{id}', 'PcStatsController@getOne');
    Route::get('pcstats/{id}/{any}', 'PcStatsController@findData');
    Route::get('pcstats/{any}', 'PcStatsController@allData');
    Route::put('pcstats/{id}', 'PcStatsController@updateOne');
    Route::put('pcstats', 'PcStatsController@updateBatch');
    // character stats
    Route::any('characters/{id}/stats', 'CharactersController@stats');
    
    //-----------------------------------------------------
    // User Management
    //-----------------------------------------------------
    Route::put('users', 'UsersController@store');
    
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
