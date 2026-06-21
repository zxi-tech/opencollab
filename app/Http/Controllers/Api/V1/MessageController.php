<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\Messaging\SendMessageRequest;
use App\DTOs\Messaging\SendMessageDTO;
use App\Services\MessagingService;
use App\Models\Workspace;
use Illuminate\Http\JsonResponse;

class MessageController extends Controller
{
    public function __construct(
        protected MessagingService $messagingService
    ) {}

    public function store(SendMessageRequest $request, Workspace $workspace): JsonResponse
    {
        // Keamanan utama: Pastikan pengirim adalah bagian dari member di Workspace ini
        if (!$workspace->members()->where('user_id', $request->user()->id)->exists()) {
            return response()->json([
                'message' => 'Akses ditolak. Anda bukan anggota dari workspace ini.'
            ], 403);
        }

        // Keamanan tambahan: Lakukan pengecekan ini HANYA JIKA ini adalah pesan DM
        if ($request->filled('receiver_id')) {
            if (!$workspace->members()->where('user_id', $request->validated('receiver_id'))->exists()) {
                return response()->json([
                    'message' => 'Gagal mengirim pesan. Pengguna tujuan tidak ada di workspace ini.'
                ], 422);
            }
        }

        // DTO yang baru ini sudah fleksibel menerima receiverId ATAU channelId
        $dto = new SendMessageDTO(
            workspaceId: $workspace->id,
            content: $request->validated('content'),
            receiverId: $request->validated('receiver_id') ?? null,
            channelId: $request->validated('channel_id') ?? null,
        );

        $message = $this->messagingService->sendMessage($dto, $request->user()->id);

        return response()->json([
            'message' => 'Pesan berhasil dikirim',
            'data' => $message->load('sender:id,name')
        ], 201);
    }
}