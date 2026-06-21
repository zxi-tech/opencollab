<?php

use App\Http\Controllers\Api\V1\AuthController;
use App\Http\Controllers\Api\V1\WorkspaceController;
use App\Http\Controllers\Api\V1\MessageController;
use App\Http\Controllers\Api\V1\ConversationController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Semua rute dibungkus dalam prefix 'v1'
Route::prefix('v1')->group(function () {

    // --- PUBLIC ROUTES (Tidak butuh login) ---
    Route::prefix('auth')->group(function () {
        Route::post('/register', [AuthController::class, 'register']);
        Route::post('/login', [AuthController::class, 'login']);
    });

    // --- PROTECTED ROUTES (Wajib login / Token Sanctum) ---
    Route::middleware('auth:sanctum')->group(function () {
        
        // Auth Protected Routes
        Route::prefix('auth')->group(function () {
            Route::post('/logout', [AuthController::class, 'logout']);
            Route::get('/me', function (Request $request) {
                return response()->json(['data' => $request->user()]);
            });
        });

        // Workspace Routes
        Route::prefix('workspaces')->group(function () {
            Route::get('/', [WorkspaceController::class, 'index']); // Melihat daftar workspace
            Route::post('/', [WorkspaceController::class, 'store']); // Membuat workspace baru
            Route::post('/{workspace}/members', [WorkspaceController::class, 'addMember']);
            Route::post('/{workspace}/messages', [MessageController::class, 'store']);
            Route::get('/{workspace}/conversations', [ConversationController::class, 'index']);
            Route::get('/{workspace}/conversations/{conversation}/messages', [ConversationController::class, 'messages']);
        });
    });

});