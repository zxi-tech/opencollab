<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Message; 
use App\Events\MessageSent;

Route::get('/', function () {
    // 1. Auto-login sebagai ID 1
    if (!auth()->check()) {
        auth()->loginUsingId(1);
    }

    // 2. Tarik riwayat pesan KHUSUS untuk workspace 2
    $messages = Message::with('sender')->where('workspace_id', 2)->get();

    return Inertia::render('Dashboard', [
        'initialMessages' => $messages
    ]);
});

// Rute POST
Route::post('/workspaces/{workspace}/messages', function (Request $request, $workspace) {
    $request->validate([
        'content' => 'required|string',
    ]);

    // 3. Simpan pesan dengan struktur lengkap sesuai Model Message
    $message = Message::create([
        'workspace_id' => $workspace, // Diambil dari URL (2)
        'user_id' => auth()->id() ?? 1, 
        'content' => $request->content,
        
        // PENTING: Isi relasi polymorphic agar database tidak protes
        'messageable_type' => 'App\Models\Channel', // Asumsi pesan ini untuk Channel
        'messageable_id' => 2, // ID channel-nya
    ]);

    $message->load('sender');

    broadcast(new MessageSent($message))->toOthers();

    return back();
});