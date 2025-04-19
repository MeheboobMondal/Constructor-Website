<?php

use App\Http\Controllers\admin\BlogController;
use App\Http\Controllers\admin\dashboardController;
use App\Http\Controllers\admin\ProjectController;
use App\Http\Controllers\admin\ServiceController;
use App\Http\Controllers\admin\TempImageController;
use App\Http\Controllers\admin\TestimonialController;
use App\Http\Controllers\Authentication;
use App\Http\Controllers\front\blogController as FrontBlogController;
use App\Http\Controllers\front\projectController as FrontProjectController;
use App\Http\Controllers\front\serviceController as FrontServiceController;
use App\Http\Controllers\front\TestimonialController as FrontTestimonialController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post('login', [Authentication::class, 'login']);
Route::get('get-all-services', [FrontServiceController::class, 'index']);
Route::get('get-limit-services', [FrontServiceController::class, 'limitData']);

// prrojects routes
Route::get('get-all-projects', [FrontProjectController::class, 'getAllData']);
Route::get('get-limit-projects', [FrontProjectController::class, 'limitData']);

// Blogs Routes

Route::get('blogs/get-all-article', [FrontBlogController::class, 'allData']);
Route::get('blogs/get-limit-article', [FrontBlogController::class, 'latest']);

// Testimonial Routes
Route::get('get-all-testimonials', [FrontTestimonialController::class, 'showAllData']);
    
Route::group(['middleware' => ['auth:sanctum']], function(){
    // protected routes
    Route::get('logout', [Authentication::class, 'logout']);
    Route::get('admin/dashboard', [dashboardController::class, 'index']);
    // service api routes
    Route::post('service/create', [ServiceController::class, 'store']);
    Route::get('service/data', [ServiceController::class, 'index']);
    Route::put('service/{id}', [ServiceController::class, 'update']);
    Route::get('service/{id}', [ServiceController::class, 'show']);
    Route::delete('service/{id}', [ServiceController::class, 'destroy']);
    Route::post('service/image', [TempImageController::class, 'store']);
    // project api routes
    Route::post('project/create', [ProjectController::class, 'store']);
    Route::get('project/show', [ProjectController::class, 'index']);
    Route::put('project/update/{id}', [ProjectController::class, 'update']);
    Route::get('project/show/{id}', [ProjectController::class, 'show']);
    Route::delete('project/delete/{id}', [ProjectController::class, 'destroy']);
    // blogs api routes
    Route::post('blogs/create', [BlogController::class, 'create']);
    Route::get('blogs/show', [BlogController::class, 'show']);
    Route::get('blogs/index/{id}', [BlogController::class, 'index']);
    Route::put('blogs/update/{id}', [BlogController::class, 'update']);
    Route::delete('blogs/delete/{id}', [BlogController::class, 'destroy']);
    // testimonials api routes
    Route::post('testimonial/create', [TestimonialController::class, 'store']);
    Route::get('testimonial/index', [TestimonialController::class, 'index']);
    Route::get('testimonial/index/{id}', [TestimonialController::class, 'singleData']);
    Route::put('testimonial/update/{id}', [TestimonialController::class, 'update']);
    Route::delete('testimonial/delete/{id}', [TestimonialController::class, 'destroy']);

});
