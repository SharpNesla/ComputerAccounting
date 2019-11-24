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

Route::post('/login', 'EmployeeController@login');
Route::post('/logout', 'EmployeeController@logout');

Route::get('/computer/get', 'ComputerController@get');
Route::get('/computer/count', 'ComputerController@getCount');
Route::post('/computer/add', 'ComputerController@add');
Route::post('/computer/edit/{id}', 'ComputerController@update');
Route::delete('/computer/remove/{id}', 'ComputerController@remove');
Route::get('/computer/{id}', 'ComputerController@getById');

Route::get('/room/get', 'RoomController@get');
Route::get('/room/count', 'RoomController@getCount');
Route::post('/room/add', 'RoomController@add');
Route::post('/room/edit/{id}', 'RoomController@update');
Route::delete('/room/remove/{id}', 'RoomController@remove');
Route::get('/room/{id}', 'RoomController@getById');

Route::get('/subsidiary/get', 'SubsidiaryController@get');
Route::get('/subsidiary/count', 'SubsidiaryController@getCount');
Route::post('/subsidiary/add', 'SubsidiaryController@add');
Route::post('/subsidiary/edit/{id}', 'SubsidiaryController@update');
Route::delete('/subsidiary/remove/{id}', 'SubsidiaryController@remove');
Route::get('/subsidiary/{id}', 'SubsidiaryController@getById');

Route::get('/license/get', 'LicenseController@get');
Route::get('/license/count', 'LicenseController@getCount');
Route::post('/license/add', 'LicenseController@add');
Route::post('/license/edit/{id}', 'LicenseController@update');
Route::delete('/license/remove/{id}', 'LicenseController@remove');
Route::get('/license/{id}', 'LicenseController@getById');

Route::get('/software/get', 'SoftwareController@get');
Route::get('/software/count', 'SoftwareController@getCount');
Route::post('/software/add', 'SoftwareController@add');
Route::post('/software-type/edit/{id}', 'SoftwareController@update');
Route::delete('/software/remove/{id}', 'SoftwareController@remove');
Route::get('/software/{id}', 'SoftwareController@getById');

Route::get('/software-type/get', 'SoftwareTypeController@get');
Route::get('/software-type/count', 'SoftwareTypeController@getCount');
Route::post('/software-type/add', 'SoftwareTypeController@add');
Route::post('/software-type/edit/{id}', 'SoftwareTypeController@update');
Route::delete('/software-type/remove/{id}', 'SoftwareTypeController@remove');
Route::get('/software-type/{id}', 'SoftwareTypeController@getById');


Route::get('/part/get', 'PartController@get');
Route::get('/part/count', 'PartController@getCount');
Route::post('/part/add', 'PartController@add');
Route::post('/part-type/edit/{id}', 'PartController@update');
Route::delete('/part/remove/{id}', 'PartController@remove');
Route::get('/part/{id}', 'PartController@getById');

Route::get('/part-type/get', 'PartTypeController@get');
Route::get('/part-type/count', 'PartTypeController@getCount');
Route::post('/part-type/add', 'PartTypeController@add');
Route::post('/part-type/edit/{id}', 'PartTypeController@update');
Route::delete('/part-type/remove/{id}', 'PartTypeController@remove');
Route::get('/part-type/{id}', 'PartTypeController@getById');
