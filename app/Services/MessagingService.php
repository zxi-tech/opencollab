<?php

namespace App\Services;

use App\DTOs\Messaging\SendMessageDTO;
use App\Models\Conversation;
use App\Models\Channel;
use App\Models\Message;
use App\Repositories\Contracts\MessageRepositoryInterface;
use Illuminate\Support\Facades\DB;
use InvalidArgumentException;

class MessagingService
{
    public function __construct(
        protected MessageRepositoryInterface $messageRepository
    ) {}

    public function sendMessage(SendMessageDTO $dto, int $senderId): Message
    {
        return DB::transaction(function () use ($dto, $senderId) {
            $messageableType = null;
            $messageableId = null;

            // Jika ada channelId, arahkan relasi polymorphic ke Channel
            if ($dto->channelId) {
                $messageableType = Channel::class;
                $messageableId = $dto->channelId;
            } 
            // Jika ada receiverId, cari/buat Conversation, arahkan ke Conversation
            elseif ($dto->receiverId) {
                $conversation = $this->messageRepository->findOrCreateDirectConversation(
                    $dto->workspaceId,
                    $senderId,
                    $dto->receiverId
                );
                $messageableType = Conversation::class;
                $messageableId = $conversation->id;
            } else {
                throw new InvalidArgumentException("Harus menyertakan receiver_id atau channel_id.");
            }

            return $this->messageRepository->createMessage([
                'workspace_id' => $dto->workspaceId,
                'user_id' => $senderId,
                'messageable_type' => $messageableType,
                'messageable_id' => $messageableId,
                'content' => $dto->content,
            ]);
        });
    }

    public function getConversationMessages(int $conversationId)
    {
        return $this->messageRepository->getConversationMessages($conversationId);
    }

    public function getChannelMessages(int $channelId)
    {
        return $this->messageRepository->getChannelMessages($channelId);
    }
}