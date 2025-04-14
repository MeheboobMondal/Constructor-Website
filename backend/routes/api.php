<?php

use App\Http\Controllers\admin\dashboardController;
use App\Http\Controllers\admin\ProjectController;
use App\Http\Controllers\admin\ServiceController;
use App\Http\Controllers\admin\TempImageController;
use App\Http\Controllers\Authentication;
use App\Http\Controllers\front\projectController as FrontProjectController;
use App\Http\Controllers\front\serviceController as FrontServiceController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post('login', [Authentication::class, 'login']);
Route::get('get-all-services', [FrontServiceController::class, 'index']);
Route::get('get-limit-services', [FrontServiceController::class, 'limitData']);

// prrojects routes
Route::get('get-all-projects', [FrontProjectController::class, 'getAllData']);
Route::get('get-limit-projects', [FrontProjectController::class, 'limitData']);
    
Route::group(['middleware' => ['auth:sanctum']], function(){
    // protected routes
    Route::get('logout', [Authentication::class, 'logout']);
    Route::get('admin/dashboard', [dashboardController::class, 'index']);
    Route::post('service/create', [ServiceController::class, 'store']);
    Route::get('service/data', [ServiceController::class, 'index']);
    Route::put('service/{id}', [ServiceController::class, 'update']);
    Route::get('service/{id}', [ServiceController::class, 'show']);
    Route::delete('service/{id}', [ServiceController::class, 'destroy']);
    Route::post('service/image', [TempImageController::class, 'store']);
    Route::post('project/create', [ProjectController::class, 'store']);
    Route::get('project/show', [ProjectController::class, 'index']);
    Route::put('project/update/{id}', [ProjectController::class, 'update']);
    Route::get('project/show/{id}', [ProjectController::class, 'show']);
    Route::delete('project/delete/{id}', [ProjectController::class, 'destroy']);

});
