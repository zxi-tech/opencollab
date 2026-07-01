<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Models\Message; 
use App\Events\MessageSent;

// 1. Rute Landing Page
Route::get('/', function () {
    return Inertia::render('Welcome');
});

// 2. Rute Autentikasi (Placeholder untuk nanti)
// Rute publik untuk halaman login Desktop
Route::get('/login', function () {
    // Kita arahkan Inertia untuk mencari di dalam folder Desktop
    return Inertia::render('Desktop/Dashboard'); 
})->name('login');

Route::get('/register', function () {
    return inertia('Auth/Register'); 
});

Route::get('/messages', function () {
    return Inertia::render('Desktop/Messages');
})->name('messages');

Route::post('/logout', function (Request $request) {
    Auth::logout();
    $request->session()->invalidate();
    $request->session()->regenerateToken();
    
    return redirect('/login');
})->name('logout');

// 3. Rute Dashboard Chat Dinamis
Route::middleware('auth')->group(function () {
    Route::get('/workspaces/{workspace}/channels/{channel}', function ($workspaceId, $channelId) {
        $messages = Message::with('sender')
            ->where('workspace_id', $workspaceId)
            ->where('messageable_type', 'App\Models\Channel')
            ->where('messageable_id', $channelId)
            ->get();

        return Inertia::render('Dashboard', [
            'initialMessages'    => $messages,
            'currentWorkspaceId' => $workspaceId,
            'currentChannelId'   => $channelId,
        ]);
    });

    Route::post('/workspaces/{workspace}/channels/{channel}/messages', function (Request $request, $workspaceId, $channelId) {
        $request->validate([
            'content' => 'required|string',
        ]);

        $message = Message::create([
            'workspace_id'     => $workspaceId, 
            'user_id'          => auth()->id(), 
            'content'          => $request->content,
            'messageable_type' => 'App\Models\Channel', 
            'messageable_id'   => $channelId, 
        ]);

        $message->load('sender');
        broadcast(new MessageSent($message))->toOthers();

        return back();
    });
});