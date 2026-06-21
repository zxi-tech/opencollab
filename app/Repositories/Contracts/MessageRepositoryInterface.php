<?php

namespace App\Repositories\Contracts;

use App\Models\Conversation;
use App\Models\Message;

interface MessageRepositoryInterface
{
    public function findOrCreateDirectConversation(int $workspaceId, int $userA, int $userB): Conversation;
    public function createMessage(array $data): Message;
    public function getConversationMessages(int $conversationId, int $perPage = 50);
}