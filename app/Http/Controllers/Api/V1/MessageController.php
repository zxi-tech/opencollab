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
        // Keamanan: Pastikan pengirim adalah bagian dari member di Workspace ini
        if (!$workspace->members()->where('user_id', $request->user()->id)->exists()) {
            return response()->json([
                'message' => 'Akses ditolak. Anda bukan anggota dari workspace ini.'
            ], 403);
        }

        // Keamanan tambahan: Pastikan penerima juga merupakan member dari Workspace ini
        if (!$workspace->members()->where('user_id', $request->validated('receiver_id'))->exists()) {
            return response()->json([
                'message' => 'Gagal mengirim pesan. Pengguna tujuan tidak ada di workspace ini.'
            ], 422);
        }

        $dto = new SendMessageDTO(
            workspaceId: $workspace->id,
            receiverId: $request->validated('receiver_id'),
            content: $request->validated('content') // <--- INI YANG DIPERBAIKI (sebelumnya body:)
        );

        $message = $this->messagingService->sendMessage($dto, $request->user()->id);

        return response()->json([
            'message' => 'Pesan berhasil dikirim',
            'data' => $message->load('sender:id,name')
        ], 201);
    }
}