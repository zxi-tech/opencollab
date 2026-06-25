<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Message; 
use App\Events\MessageSent;

// 1. Rute GET Dinamis: Membaca ID Workspace dan ID Channel dari URL
Route::get('/workspaces/{workspace}/channels/{channel}', function ($workspaceId, $channelId) {
    if (!auth()->check()) {
        auth()->loginUsingId(1); // Bypass login otomatis untuk User ID 1
    }

    // Ambil riwayat pesan yang sesuai dengan Workspace DAN Channel yang sedang dibuka
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

// 2. Rute POST Dinamis: Mengirim pesan ke Workspace dan Channel yang spesifik
Route::post('/workspaces/{workspace}/channels/{channel}/messages', function (Request $request, $workspaceId, $channelId) {
    $request->validate([
        'content' => 'required|string',
    ]);

    $message = Message::create([
        'workspace_id'     => $workspaceId, 
        'user_id'          => auth()->id() ?? 1, 
        'content'          => $request->content,
        'messageable_type' => 'App\Models\Channel', 
        'messageable_id'   => $channelId, 
    ]);

    $message->load('sender');

    // Pancarkan ke Private Channel Reverb secara dinamis
    broadcast(new MessageSent($message))->toOthers();

    return back();
});