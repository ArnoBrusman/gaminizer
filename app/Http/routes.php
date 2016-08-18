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

//-----------------------------------------------------
// Debug routes
//-----------------------------------------------------
Route::any('characters/test', 'RestApi\\CharactersController@test');
//Route::any('test/stats', function(){
//     $response = $this->call('POST', '/restapi/characters/stats',
//             ['elaborate' => TRUE]);
//});
//-----------------------------------------------------
// Sheet Routes
//-----------------------------------------------------

Route::any('sheet/{id}', 'SheetController@index');
Route::any('init/{id}', 'SheetController@init');

//-----------------------------------------------------
// Api Routes
//-----------------------------------------------------

// Characters controller
Route::any('restapi/characters/', 'RestApi\\CharactersController@getAll');
Route::any('restapi/characters/{id}', 'RestApi\\CharactersController@getOne')
        ->where(['id' => '[0-9]+']);
Route::any('restapi/characters/{id}/{any}', 'RestApi\\CharactersController@findData')
        ->where(['id' => '[0-9]+']);
Route::any('restapi/characters/{any}', 'RestApi\\CharactersController@allData');

// Classes controller
Route::any('restapi/classes/', 'RestApi\\ClassesController@getAll');
Route::any('restapi/classes/{id}', 'RestApi\\ClassesController@getOne')
        ->where(['id' => '[0-9]+']);
Route::any('restapi/classes/{id}/{any}', 'RestApi\\ClassesController@findData')
        ->where(['id' => '[0-9]+']);
Route::any('restapi/classes/{any}', 'RestApi\\ClassesController@allData');

// Features controller
Route::any('restapi/features/', 'RestApi\\FeaturesController@getAll');
Route::any('restapi/features/{id}', 'RestApi\\FeaturesController@getOne')
        ->where(['id' => '[0-9]+']);
Route::any('restapi/features/{id}/{any}', 'RestApi\\FeaturesController@findData')
        ->where(['id' => '[0-9]+']);
Route::any('restapi/features/{any}', 'RestApi\\FeaturesController@allData');

// Races controller
Route::any('restapi/races/', 'RestApi\\RacesController@getAll');
Route::any('restapi/races/{id}', 'RestApi\\RacesController@getOne')
        ->where(['id' => '[0-9]+']);
Route::any('restapi/races/{id}/{any}', 'RestApi\\RacesController@findData')
        ->where(['id' => '[0-9]+']);
Route::any('restapi/races/{any}', 'RestApi\\RacesController@allData');

// Stats Elaborate controller
Route::any('restapi/pcstats/', 'RestApi\\PcStatsController@getAll');
Route::any('restapi/pcstats/{id}', 'RestApi\\PcStatsController@getOne')
        ->where(['id' => '[0-9]+']);
Route::any('restapi/pcstats/{id}/{any}', 'RestApi\\PcStatsController@findData')
        ->where(['id' => '[0-9]+']);
Route::any('restapi/pcstats/{any}', 'RestApi\\PcStatsController@allData');