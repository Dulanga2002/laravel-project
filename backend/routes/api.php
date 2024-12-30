<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\MovieController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\FavoriteController;
use Illuminate\Support\Facades\Route;

// Public Routes
Route::prefix('public')->group(function () {
    Route::get('/categories', [CategoryController::class, 'index']);
    Route::get('/categories/{id}', [CategoryController::class, 'show']);
    Route::get('/movies', [MovieController::class, 'index']);
    Route::get('/movies/all', [MovieController::class, 'all']); // New route
    Route::get('/movies/{id}', [MovieController::class, 'show']);
});

// Authentication Routes
Route::prefix('auth')->group(function () {
    Route::post('/register', [RegisteredUserController::class, 'store']);
    Route::post('/login', [AuthenticatedSessionController::class, 'store']);
});

// Protected Routes
Route::middleware('auth:sanctum')->group(function () {
    // User Routes
    Route::prefix('user')->group(function () {
        Route::get('/', [RegisteredUserController::class, 'index']);
        Route::post('/logout', [AuthenticatedSessionController::class, 'destroy']);
    });

    // Favorite Routes
    Route::prefix('favorites')->group(function () {
        Route::get('/', [FavoriteController::class, 'index']);
        Route::post('/', [FavoriteController::class, 'store']);
        Route::delete('/{id}', [FavoriteController::class, 'destroy']);
    });

    // Admin Routes
    Route::middleware('admin')->prefix('admin')->group(function () {
        Route::prefix('movies')->group(function () {
            Route::post('/', [MovieController::class, 'store']);
            Route::put('/{id}', [MovieController::class, 'update']);
            Route::delete('/{id}', [MovieController::class, 'destroy']);
        });
    });
});
Route::aliasMiddleware('admin', \App\Http\Middleware\EnsureUserIsAdmin::class);
