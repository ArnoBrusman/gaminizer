<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

use Illuminate\Support\Str;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:api');

//-----------------------------------------------------
// Api Routes
//-----------------------------------------------------

Route::group(['as' => 'api::', 'namespace' => 'Api', 'prefix' => 'api'], function() {

    // generic routes
    $apiGroups = [
        'pcs',
        'classes',
        'races',
        'features',
    ];
    // api relations
    $apiGroupCollections = [];
    
    
    foreach ($apiGroups as $group) {
        
        Route::group(['prefix' => $group, 'as' => $group.'::'], function() use ($group,$apiGroupCollections) {
//            \Illuminate\Database\Query\Grammars;
//            Route::group(['middleware'=>'auth:api'],function() use ($group,$apiGroupCollections) {
                $controller = ucfirst(camel_case($group)) . 'Controller';
                $object = Str::singular($group);
                Route::get('/', $controller.'@index');
                Route::get('/{'.$object.'}', $controller.'@show');
                Route::get('{'.$object.'}/values', $controller.'@valuesIndex');
                Route::group([],function() use ($group,$apiGroupCollections) {
                    $controller = ucfirst(camel_case($group)) . 'Controller';
                    $object = Str::singular($group);
                    Route::post('/', $controller.'@store');
                    Route::put('/', $controller.'@updateCollection'); 
                    Route::put('/{'.$object.'}', $controller.'@update');
                    Route::delete('/{'.$object.'}', $controller.'@destroy');
                    Route::put('{'.$object.'}/values', $controller.'@valuesUpdate');
                    if(key_exists($group, $apiGroupCollections)) {
                        foreach ($apiGroupCollections[$group] as $collection) {
                            Route::get('{group}/{'.$collection.'}', $controller.'@relationIndex')->where('group', $collection);
                            Route::put('{group}/{'.$collection.'}', $controller.'@relationUpdate')->where('group', $collection);
                        }
                    }
                });
//            });
        });
    }
        
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
