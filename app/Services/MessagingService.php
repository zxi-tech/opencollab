<?php

namespace App\Services;

use App\DTOs\Messaging\SendMessageDTO;
use App\Models\Conversation;
use App\Models\Message;
use App\Repositories\Contracts\MessageRepositoryInterface;
use Illuminate\Support\Facades\DB;

class MessagingService
{
    public function __construct(
        protected MessageRepositoryInterface $messageRepository
    ) {}

    public function sendMessage(SendMessageDTO $dto, int $senderId): Message
    {
        return DB::transaction(function () use ($dto, $senderId) {
            // 1. Cari atau buat percakapan direct antara sender dan receiver
            $conversation = $this->messageRepository->findOrCreateDirectConversation(
                $dto->workspaceId,
                $senderId,
                $dto->receiverId
            );

            // 2. Buat data pesan
            return $this->messageRepository->createMessage([
                'workspace_id' => $dto->workspaceId,
                'user_id' => $senderId, // <--- UBAH DI SINI (sebelumnya sender_id)
                'messageable_type' => Conversation::class,
                'messageable_id' => $conversation->id,
                'body' => $dto->content,
            ]);
        });
    }

    public function getConversationMessages(int $conversationId)
    {
        return $this->messageRepository->getConversationMessages($conversationId);
    }
}