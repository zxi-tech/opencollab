<?php

namespace App\Repositories\Eloquent;

use App\Models\Channel;
use App\DTOs\Channel\CreateChannelDTO;
use App\Repositories\Contracts\ChannelRepositoryInterface;
use Illuminate\Support\Str; // <-- Jangan lupa import ini

class ChannelRepository implements ChannelRepositoryInterface
{
    public function createChannel(CreateChannelDTO $dto): Channel
    {
        // Generate slug dari nama, tambahkan random string agar unik di database
        $slug = Str::slug($dto->name) . '-' . strtolower(Str::random(5));

        $channel = Channel::create([
            'workspace_id' => $dto->workspaceId,
            'created_by' => $dto->creatorId,
            'name' => $dto->name,
            'slug' => $slug,           // <-- Insert slug ke DB
            'description' => $dto->description,
            'type' => $dto->type,      // <-- Insert type ke DB
        ]);

        // Pembuat channel otomatis menjadi anggota pertama
        $channel->members()->attach($dto->creatorId);

        return $channel;
    }

    public function getWorkspaceChannels(int $workspaceId)
    {
        return Channel::where('workspace_id', $workspaceId)->get();
    }
}