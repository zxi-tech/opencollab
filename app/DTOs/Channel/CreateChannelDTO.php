<?php

namespace App\DTOs\Channel;

readonly class CreateChannelDTO
{
    public function __construct(
        public int $workspaceId,
        public int $creatorId,
        public string $name,
        public ?string $description = null,
        public string $type = 'public', // <-- Disesuaikan
    ) {}
}