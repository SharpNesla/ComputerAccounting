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

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/computer/get', 'ComputerController@get');
Route::get('/computer/count', 'ComputerController@getCount');
Route::post('/computer/add', 'ComputerController@add');
Route::delete('/computer/remove/{id}', 'ComputerController@delete');
Route::get('/computer/{id}', 'ComputerController@getById');
//
//Route::get('/room/get', 'RoomController@get');
//Route::get('/room/{id}', 'RoomController@getById');
//Route::get('/room/count', 'RoomController@getCount');
//Route::post('/room/add', 'RoomController@add');
//Route::delete('/room/remove/{id}', 'RoomController@delete');
//
//Route::get('/subsidiary/get', 'SubsidiaryController@get');
//Route::get('/subsidiary/{id}', 'SubsidiaryController@getById');
//Route::get('/subsidiary/count', 'SubsidiaryController@getCount');
//Route::post('/subsidiary/add', 'SubsidiaryController@add');
//Route::delete('/subsidiary/remove/{id}', 'SubsidiaryController@delete');
