<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\Channel\CreateChannelRequest;
use App\DTOs\Channel\CreateChannelDTO;
use App\Services\ChannelService;
use App\Models\Workspace;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ChannelController extends Controller
{
    public function __construct(
        protected ChannelService $channelService
    ) {}

    public function index(Request $request, Workspace $workspace): JsonResponse
    {
        // Pastikan user adalah anggota dari workspace ini
        if (!$workspace->members()->where('user_id', $request->user()->id)->exists()) {
            return response()->json(['message' => 'Akses ditolak.'], 403);
        }

        $channels = $this->channelService->getWorkspaceChannels($workspace->id);

        return response()->json([
            'message' => 'Berhasil mengambil daftar channel',
            'data' => $channels
        ]);
    }

    public function store(CreateChannelRequest $request, Workspace $workspace): JsonResponse
    {
        // Pastikan user adalah anggota dari workspace ini
        if (!$workspace->members()->where('user_id', $request->user()->id)->exists()) {
            return response()->json(['message' => 'Akses ditolak.'], 403);
        }

        // PERHATIKAN: Di sini kita sudah menggunakan 'type:'
        $dto = new CreateChannelDTO(
            workspaceId: $workspace->id,
            creatorId: $request->user()->id,
            name: $request->validated('name'),
            description: $request->validated('description'),
            type: $request->validated('type') ?? 'public', 
        );

        $channel = $this->channelService->createChannel($dto);

        return response()->json([
            'message' => 'Channel berhasil dibuat',
            'data' => $channel
        ], 201);
    }
}