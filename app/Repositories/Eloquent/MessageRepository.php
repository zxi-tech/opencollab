<?php

namespace App\Repositories\Eloquent;

use App\Models\Conversation;
use App\Models\Message;
use App\Repositories\Contracts\MessageRepositoryInterface;

class MessageRepository implements MessageRepositoryInterface
{
    public function findOrCreateDirectConversation(int $workspaceId, int $userA, int $userB): Conversation
    {
        // Cari percakapan 'direct' yang sudah melibatkan kedua user ini di workspace tersebut
        $conversation = Conversation::where('workspace_id', $workspaceId)
            ->where('type', 'direct')
            ->whereHas('participants', function ($q) use ($userA) {
                $q->where('user_id', $userA);
            })
            ->whereHas('participants', function ($q) use ($userB) {
                $q->where('user_id', $userB);
            })
            ->first();

        // Jika belum ada, buat baru dan daftarkan kedua user sebagai partisipan
        if (!$conversation) {
            $conversation = Conversation::create([
                'workspace_id' => $workspaceId,
                'type' => 'direct',
            ]);

            $conversation->participants()->attach([$userA, $userB]);
        }

        return $conversation;
    }

    public function createMessage(array $data): Message
    {
        return Message::create($data);
    }

    public function getConversationMessages(int $conversationId, int $perPage = 50)
    {
        return Message::where('messageable_type', Conversation::class)
            ->where('messageable_id', $conversationId)
            ->with('sender:id,name,email')
            ->orderBy('created_at', 'asc')
            ->paginate($perPage);
    }
}