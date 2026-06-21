<?php

namespace App\DTOs\Workspace;

readonly class CreateWorkspaceDTO
{
    public function __construct(
        public string $name,
        public ?string $description = null,
        public ?string $logo = null,
    ) {}
}