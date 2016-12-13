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
Route::get('admin', 'Admin\\AdminController@index')->name('admin');
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

    // Narrative controller
    Route::group(['prefix'=>'narratives'], function(){
        Route::get('/', 'NarrativesController@index');
        Route::get('{id}', 'NarrativesController@show');
        Route::put('{id}', 'NarrativesController@update')->name('::update');
        Route::delete('{id}', 'NarrativesController@delete')->name('::delete');
        Route::post('/', 'NarrativesController@store')->name('::store');
    });
    
    // Classes controller
    Route::group(['prefix'=>'classes'], function(){
        Route::get('/', 'ClassesController@index');
        Route::get('{id}', 'ClassesController@show');
        Route::put('{id}', 'ClassesController@update')->name('::update');
        Route::delete('{id}', 'ClassesController@delete')->name('::delete');
        Route::post('/', 'ClassesController@store')->name('::store');
    });
    
    // Classes controller
    Route::group(['prefix'=>'races'], function(){
        Route::get('/', 'RacesController@index');
        Route::get('{id}', 'RacesController@show');
        Route::put('{id}', 'RacesController@update')->name('::update');
        Route::delete('{id}', 'RacesController@delete')->name('::delete');
        Route::post('/', 'RacesController@store')->name('::store');
    });
    
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

Route::get('/home', 'HomeController@index');
