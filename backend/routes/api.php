<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

Route::group([
    'prefix' => 'auth'
], function () {
    Route::post('login', 'EmployeeController@login');
    Route::post('signup', 'EmployeeController@signup');

    Route::group([
        'middleware' => 'auth:api'
    ], function () {
        Route::get('logout', 'EmployeeController@logout');
        Route::get('user', 'EmployeeController@user');
        Route::get('director-dashboard-info', 'EmployeeController@getDirectorDashboardInfo');
        Route::get('change-color-scheme', 'EmployeeController@changeColorScheme');
    });
});

Route::group(['prefix' => 'employee', 'middleware' => 'auth:api'], function () {
    Route::get('get', 'EmployeeController@get');
//        ->middleware('role:director,branchDirector');
    Route::get('get-tree', 'EmployeeController@getTree');
    Route::get('count', 'EmployeeController@getCount');
    Route::post('add', 'EmployeeController@add');
    Route::post('edit/{id}', 'EmployeeController@update');
    Route::delete('remove/{id}', 'EmployeeController@remove');
    Route::get('{id}', 'EmployeeController@getById');
});

Route::group(['prefix' => 'computer', 'middleware' => 'auth:api'], function () {
    Route::get('get', 'ComputerController@get');
    Route::get('get-dependency-satisfying', 'ComputerController@getDependencySatisfying');
    Route::get('count', 'ComputerController@getCount');

    Route::get('get-count-by-subsidiary', 'ComputerController@getCountBySubsidiary')
        ->middleware('role:director');

    Route::post('add', 'ComputerController@add');
    Route::post('edit/{id}', 'ComputerController@update');
    Route::delete('remove/{id}', 'ComputerController@remove');
    Route::get('{id}', 'ComputerController@getById');
});

Route::group(['prefix' => 'room', 'middleware' => 'auth:api'], function () {
    Route::get('get', 'RoomController@get');
    Route::get('count', 'RoomController@getCount');
    Route::post('add', 'RoomController@add');
    Route::post('edit/{id}', 'RoomController@update');
    Route::delete('remove/{id}', 'RoomController@remove');
    Route::get('{id}', 'RoomController@getById');
});

Route::group(['prefix' => 'subsidiary', 'middleware' => 'auth:api'], function () {
    Route::get('get', 'SubsidiaryController@get');
    Route::get('count', 'SubsidiaryController@getCount');
    Route::post('add', 'SubsidiaryController@add');
    Route::post('edit/{id}', 'SubsidiaryController@update');
    Route::delete('remove/{id}', 'SubsidiaryController@remove');
    Route::get('{id}', 'SubsidiaryController@getById');
});

Route::group(['prefix' => 'license', 'middleware' => 'auth:api'], function () {
    Route::get('get', 'LicenseController@get');
    Route::get('get-applicable', 'LicenseController@getApplicable');
    Route::get('count', 'LicenseController@getCount');

    Route::get('get-count-by-date', 'LicenseController@getCountByDate');

    Route::post('add', 'LicenseController@add');
    Route::post('add-pack', 'LicenseController@addPack');
    Route::post('edit/{id}', 'LicenseController@update');
    Route::delete('remove/{id}', 'LicenseController@remove');
    Route::get('{id}', 'LicenseController@getById');
});

Route::group(['prefix' => 'software', 'middleware' => 'auth:api'], function () {
    Route::get('get', 'SoftwareController@get');
    Route::get('count', 'SoftwareController@getCount');
    Route::post('add', 'SoftwareController@add');
    Route::post('add-pack', 'SoftwareController@addPack');
    Route::post('edit/{id}', 'SoftwareController@update');
    Route::delete('remove/{id}', 'SoftwareController@remove');
    Route::get('{id}', 'SoftwareController@getById');
});

Route::group(['prefix' => 'software-type', 'middleware' => 'auth:api'], function () {
    Route::get('get', 'SoftwareTypeController@get');
    Route::get('count', 'SoftwareTypeController@getCount');
    Route::post('add', 'SoftwareTypeController@add');
    Route::post('edit/{id}', 'SoftwareTypeController@update');
    Route::delete('remove/{id}', 'SoftwareTypeController@remove');
    Route::get('{id}', 'SoftwareTypeController@getById');
});

Route::group(['prefix' => 'part', 'middleware' => 'auth:api'], function () {
    Route::get('get', 'PartController@get');


    Route::get('get-count-by-date', 'PartController@getCountByDate');
    Route::get('get-count-by-type', 'PartController@getCountByType');

    Route::get('get-count-by-subsidiary', 'ComputerController@getCountBySubsidiary')
        ->middleware('role:director');

    Route::get('count', 'PartController@getCount');
    Route::post('add', 'PartController@add');
    Route::post('add-pack', 'PartController@addPack');
    Route::post('edit/{id}', 'PartController@update');
    Route::delete('remove/{id}', 'PartController@remove');
    Route::get('{id}', 'PartController@getById');
});

Route::group(['prefix' => 'part-type', 'middleware' => 'auth:api'], function () {
    Route::get('get', 'PartTypeController@get');
    Route::get('count', 'PartTypeController@getCount');
    Route::post('add', 'PartTypeController@add');
    Route::post('edit/{id}', 'PartTypeController@update');
    Route::delete('remove/{id}', 'PartTypeController@remove');
    Route::get('{id}', 'PartTypeController@getById');
});




