<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\Channel\CreateChannelRequest;
use App\DTOs\Channel\CreateChannelDTO;
use App\Services\ChannelService;
use App\Models\Workspace;
use App\Services\MessagingService;
use App\Models\Channel;
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


    public function messages(Request $request, Workspace $workspace, Channel $channel, MessagingService $messagingService): JsonResponse
    {
        // 1. Pastikan channel ini benar-benar milik workspace yang direquest
        if ($channel->workspace_id !== $workspace->id) {
            return response()->json(['message' => 'Channel tidak ditemukan di workspace ini.'], 404);
        }

        // 2. Pastikan user adalah anggota workspace
        if (!$workspace->members()->where('user_id', $request->user()->id)->exists()) {
            return response()->json(['message' => 'Akses ditolak.'], 403);
        }

        // 3. Jika channel ini private, pastikan user sudah bergabung di dalamnya
        if ($channel->type === 'private') {
            if (!$channel->members()->where('user_id', $request->user()->id)->exists()) {
                return response()->json(['message' => 'Akses ditolak. Anda bukan anggota dari channel private ini.'], 403);
            }
        }

        // Ambil riwayat pesan
        $messages = $messagingService->getChannelMessages($channel->id);

        return response()->json([
            'message' => 'Berhasil mengambil riwayat pesan channel',
            'data' => $messages
        ]);
    }

}