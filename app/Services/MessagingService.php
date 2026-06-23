<?php

namespace App\Services;

use App\DTOs\Messaging\SendMessageDTO;
use App\Models\Conversation;
use App\Models\Channel;
use App\Models\Message;
use App\Repositories\Contracts\MessageRepositoryInterface;
use App\Events\MessageSent;
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

            if ($dto->channelId) {
                $messageableType = Channel::class;
                $messageableId = $dto->channelId;
            } 
            elseif ($dto->receiverId) {
                $conversation = $this->messageRepository->findOrCreateDirectConversation(
                    $dto->workspaceId,
                    $senderId,
                    $dto->receiverId
                );
                $messageableType = Conversation::class;
                $messageableId = $conversation->id;
            } else {
                throw new \InvalidArgumentException("Harus menyertakan receiver_id atau channel_id.");
            }

            $message = $this->messageRepository->createMessage([
                'workspace_id' => $dto->workspaceId,
                'user_id' => $senderId,
                'messageable_type' => $messageableType,
                'messageable_id' => $messageableId,
                'content' => $dto->content,
            ]);

            // UBAH BARIS INI (Hapus ->toOthers())
            broadcast(new MessageSent($message)); 

            return $message;
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