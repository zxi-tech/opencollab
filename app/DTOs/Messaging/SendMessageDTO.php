<?php

namespace App\DTOs\Messaging;

readonly class SendMessageDTO
{
    public function __construct(
        public int $workspaceId,
        public string $content,
        public ?int $receiverId = null, // Opsional jika kirim ke Channel
        public ?int $channelId = null,  // Opsional jika kirim DM
    ) {}
}