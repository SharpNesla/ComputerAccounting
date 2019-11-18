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
Route::post('/computer/edit/{id}', 'ComputerController@update');
Route::delete('/computer/remove/{id}', 'ComputerController@remove');
Route::get('/computer/{id}', 'ComputerController@getById');

Route::get('/room/get', 'RoomController@get');
Route::get('/room/count', 'RoomController@getCount');
Route::post('/room/add', 'RoomController@add');
Route::delete('/room/remove/{id}', 'RoomController@remove');
Route::get('/room/{id}', 'RoomController@getById');

Route::get('/subsidiary/get', 'SubsidiaryController@get');
Route::get('/subsidiary/count', 'SubsidiaryController@getCount');
Route::post('/subsidiary/add', 'SubsidiaryController@add');
Route::delete('/subsidiary/remove/{id}', 'SubsidiaryController@remove');
Route::get('/subsidiary/{id}', 'SubsidiaryController@getById');


Route::get('/part/get', 'PartController@get');
Route::get('/part/count', 'PartController@getCount');
Route::post('/part/add', 'PartController@add');
Route::delete('/part/remove/{id}', 'PartController@remove');
Route::get('/part/{id}', 'PartController@getById');

Route::get('/part-type/get', 'PartTypeController@get');
Route::get('/part-type/count', 'PartTypeController@getCount');
Route::post('/part-type/add', 'PartTypeController@add');
Route::delete('/part-type/remove/{id}', 'PartTypeController@remove');
Route::get('/part-type/{id}', 'PartTypeController@getById');
