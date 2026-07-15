<?php

use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\FeedController;
use App\Http\Controllers\API\FeedLikeController;
use App\Http\Controllers\API\FeedCommentController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::prefix('v1')->group(function(){

    // Auth Routes 
    Route::controller(AuthController::class)->group(function () {
        Route::post('login', 'login');
        Route::post('registration', 'registration');
    });
    
    
    Route::middleware('auth:sanctum')->group(function () {
        
        Route::controller(AuthController::class)->group(function () {
            Route::post('authorize', 'authorize');
            Route::post('logout', 'logout');
        });
        Route::apiResource('feeds', FeedController::class);
        
        Route::controller(FeedLikeController::class)->group(function () {
            Route::post('/feeds/{feed}/like', 'toggle_feed_like');
            Route::post('/feeds/comments/{comment}/like', 'toggle_comment_like');
        });
        
        Route::post('/feeds/{feed}/comments', [FeedCommentController::class,'store']);
    });
    
});
