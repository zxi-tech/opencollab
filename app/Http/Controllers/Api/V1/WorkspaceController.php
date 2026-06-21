<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\Workspace\CreateWorkspaceRequest;
use App\Http\Requests\Workspace\AddMemberRequest; // Import Baru
use App\DTOs\Workspace\CreateWorkspaceDTO;
use App\Services\WorkspaceService;
use App\Models\Workspace; // Import Baru
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request; // Clean up inline request

class WorkspaceController extends Controller
{
    public function __construct(
        protected WorkspaceService $workspaceService
    ) {}

    public function index(Request $request): JsonResponse
    {
        // Mengambil semua workspace di mana user ini menjadi member/owner
        $workspaces = $request->user()->workspaces;

        return response()->json([
            'message' => 'Berhasil mengambil daftar workspace',
            'data' => $workspaces
        ]);
    }

    public function store(CreateWorkspaceRequest $request): JsonResponse
    {
        $dto = new CreateWorkspaceDTO(
            $request->validated('name'),
            $request->validated('description'),
            $request->validated('logo')
        );

        $workspace = $this->workspaceService->createWorkspace($dto, $request->user());

        return response()->json([
            'message' => 'Workspace berhasil dibuat',
            'data' => $workspace
        ], 201);
    }

    public function addMember(AddMemberRequest $request, Workspace $workspace): JsonResponse
    {
        // Proteksi: Hanya Owner yang bisa menambahkan member
        if ($workspace->owner_id !== $request->user()->id) {
            return response()->json([
                'message' => 'Akses ditolak. Hanya owner yang dapat menambahkan member.'
            ], 403);
        }

        $this->workspaceService->addMember($workspace, $request->validated('email'));

        return response()->json([
            'message' => 'Member berhasil ditambahkan ke workspace.'
        ]);
    }
}