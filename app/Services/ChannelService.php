<?php

namespace App\Services;

use App\DTOs\Channel\CreateChannelDTO;
use App\Models\Channel;
use App\Repositories\Contracts\ChannelRepositoryInterface;

class ChannelService
{
    public function __construct(
        protected ChannelRepositoryInterface $channelRepository
    ) {}

    public function createChannel(CreateChannelDTO $dto): Channel
    {
        return $this->channelRepository->createChannel($dto);
    }

    public function getWorkspaceChannels(int $workspaceId)
    {
        return $this->channelRepository->getWorkspaceChannels($workspaceId);
    }
}