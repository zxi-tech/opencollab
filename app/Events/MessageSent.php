<?php

namespace App\Events;

use App\Models\Message;
use App\Models\Channel as WorkspaceChannel;
use App\Models\Conversation;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PrivateChannel;
// 1. UBAH BARIS INI (Tambahkan kata 'Now')
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow; 
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class MessageSent implements ShouldBroadcastNow 
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    /**
     * Create a new event instance.
     */
    public function __construct(
        public Message $message
    ) {
        // Memastikan relasi sender sudah terload sebelum dikirim via websocket
        if (!$this->message->relationLoaded('sender')) {
            $this->message->load('sender:id,name');
        }
    }

    /**
     * Tentukan ke channel websocket mana event ini harus disiarkan.
     * Kita menggunakan PrivateChannel agar hanya user terotorisasi yang bisa mendengarkan.
     *
     * @return array<int, \Illuminate\Broadcasting\Channel>
     */
    public function broadcastOn(): array
    {
        // Skenario 1: Jika pesan dikirim ke grup (Channel)
        if ($this->message->messageable_type === WorkspaceChannel::class) {
            return [
                new PrivateChannel("workspace.{$this->message->workspace_id}.channel.{$this->message->messageable_id}")
            ];
        }

        // Skenario 2: Jika pesan dikirim ke DM (Conversation)
        return [
            new PrivateChannel("workspace.{$this->message->workspace_id}.conversation.{$this->message->messageable_id}")
        ];
    }

    /**
     * Struktur data yang akan diterima oleh Frontend (React/TypeScript) secara realtime.
     */
    public function broadcastWith(): array
    {
        return [
            'id' => $this->message->id,
            'uuid' => $this->message->uuid,
            'workspace_id' => $this->message->workspace_id,
            'messageable_type' => $this->message->messageable_type,
            'messageable_id' => $this->message->messageable_id,
            'content' => $this->message->content,
            'created_at' => $this->message->created_at->toISOString(),
            'sender' => [
                'id' => $this->message->sender->id,
                'name' => $this->message->sender->name,
            ],
        ];
    }
}