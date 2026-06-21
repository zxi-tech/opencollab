<?php

namespace App\Repositories\Contracts;

use App\Models\Channel;
use App\DTOs\Channel\CreateChannelDTO;

interface ChannelRepositoryInterface
{
    public function createChannel(CreateChannelDTO $dto): Channel;
    public function getWorkspaceChannels(int $workspaceId);
}