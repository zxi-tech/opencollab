<?php

use Illuminate\Support\Facades\Broadcast;
use App\Models\Workspace;
use App\Models\Channel;
use App\Models\Conversation;

Broadcast::channel('workspace.{workspaceId}.channel.{channelId}', function ($user, $workspaceId, $channelId) {
    // Pastikan user adalah bagian dari member di Workspace ini
    $workspace = Workspace::find($workspaceId);
    if (!$workspace || !$workspace->members()->where('user_id', $user->id)->exists()) {
        return false;
    }

    // Pastikan channel tersebut valid di dalam workspace ini
    $channel = Channel::find($channelId);
    if (!$channel || $channel->workspace_id != $workspaceId) {
        return false;
    }

    // Jika channel bertipe private, pastikan user terdaftar sebagai member channel tersebut
    if ($channel->type === 'private') {
        return $channel->members()->where('user_id', $user->id)->exists();
    }

    return true;
});

// 2. Otorisasi untuk mendengarkan pesan di DM (Conversation)
Broadcast::channel('workspace.{workspaceId}.conversation.{conversationId}', function ($user, $workspaceId, $conversationId) {
    // Pastikan percakapan ada dan sesuai dengan workspace
    $conversation = Conversation::find($conversationId);
    if (!$conversation || $conversation->workspace_id != $workspaceId) {
        return false;
    }

    // Pastikan user yang login adalah salah satu partisipan di dalam DM ini
    return $conversation->participants()->where('user_id', $user->id)->exists();
});
