<?php

use App\Http\Controllers\API\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::prefix('v1')->group(function(){

    // Auth Routes 
    Route::controller(AuthController::class)->group(function () {
        Route::post('login', 'login');
        Route::post('registration', 'registration');
    });


});


Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');
