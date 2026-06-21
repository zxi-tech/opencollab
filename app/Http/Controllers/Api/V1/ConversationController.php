<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Workspace;
use App\Models\Conversation;
use App\Services\MessagingService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ConversationController extends Controller
{
    public function __construct(
        protected MessagingService $messagingService
    ) {}

    // 1. Mengambil daftar percakapan (DM/Group) milik user di workspace ini
    public function index(Request $request, Workspace $workspace): JsonResponse
    {
        // Validasi member
        if (!$workspace->members()->where('user_id', $request->user()->id)->exists()) {
            return response()->json(['message' => 'Akses ditolak.'], 403);
        }

        $conversations = $workspace->conversations()
            ->whereHas('participants', function ($query) use ($request) {
                $query->where('user_id', $request->user()->id);
            })
            ->with(['participants' => function ($query) {
                $query->select('users.id', 'users.name', 'users.email'); // Sembunyikan password dll
            }])
            ->orderBy('updated_at', 'desc')
            ->get();

        return response()->json([
            'message' => 'Berhasil mengambil daftar percakapan',
            'data' => $conversations
        ]);
    }

    // 2. Mengambil riwayat pesan di dalam satu percakapan
    public function messages(Request $request, Workspace $workspace, Conversation $conversation): JsonResponse
    {
        // Pastikan conversation ini milik workspace yang direquest
        if ($conversation->workspace_id !== $workspace->id) {
            return response()->json(['message' => 'Percakapan tidak ditemukan di workspace ini.'], 404);
        }

        // Pastikan user adalah partisipan di percakapan ini
        if (!$conversation->participants()->where('user_id', $request->user()->id)->exists()) {
            return response()->json(['message' => 'Akses ditolak. Anda bukan partisipan di percakapan ini.'], 403);
        }

        // Ambil pesan menggunakan MessagingService yang sudah kita buat sebelumnya
        $messages = $this->messagingService->getConversationMessages($conversation->id);

        return response()->json([
            'message' => 'Berhasil mengambil riwayat pesan',
            'data' => $messages
        ]);
    }
}