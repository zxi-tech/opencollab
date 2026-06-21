<?php

namespace App\DTOs\Messaging;

readonly class SendMessageDTO
{
    public function __construct(
        public int $workspaceId,
        public int $receiverId, // ID user tujuan DM
        public string $content,
    ) {}
}