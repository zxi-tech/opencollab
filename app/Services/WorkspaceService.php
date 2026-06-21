<?php

namespace App\Services;

use App\DTOs\Workspace\CreateWorkspaceDTO;
use App\Models\User;
use App\Models\Workspace;
use App\Repositories\Contracts\WorkspaceRepositoryInterface;
use Illuminate\Support\Facades\DB;
use Spatie\Permission\Models\Role;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException; // Import penting untuk addMember

class WorkspaceService
{
    public function __construct(
        protected WorkspaceRepositoryInterface $workspaceRepository
    ) {}

    public function createWorkspace(CreateWorkspaceDTO $dto, User $user): Workspace
    {
        return DB::transaction(function () use ($dto, $user) {
            // 1. Buat Workspace dengan Slug otomatis
            $workspace = $this->workspaceRepository->create([
                'owner_id' => $user->id,
                'name' => $dto->name,
                'slug' => Str::slug($dto->name) . '-' . uniqid(),
                'description' => $dto->description,
                'logo' => $dto->logo,
            ]);

            // 2. Tambahkan user ke tabel pivot workspace_members
            DB::table('workspace_members')->insert([
                'workspace_id' => $workspace->id,
                'user_id' => $user->id,
                'role' => 'owner',
                'created_at' => now(),
                'updated_at' => now(),
            ]);

            // 3. Konfigurasi Spatie Teams untuk Workspace ini
            setPermissionsTeamId($workspace->id);

            // 4. Pastikan Role 'Owner' ada untuk Workspace ini, lalu assign ke User
            $role = Role::firstOrCreate([
                'name' => 'Owner',
                'workspace_id' => $workspace->id,
                'guard_name' => 'web'
            ]);

            $user->assignRole($role);

            return $workspace;
        });
    }

    public function addMember(Workspace $workspace, string $email, string $role = 'member'): void
    {
        $user = User::where('email', $email)->first();

        // Cegah duplikasi jika user sudah ada di dalam workspace
        if ($workspace->members()->where('user_id', $user->id)->exists()) {
            throw ValidationException::withMessages([
                'email' => ['User ini sudah berada di dalam workspace.']
            ]);
        }

        DB::transaction(function () use ($workspace, $user, $role) {
            // 1. Masukkan ke tabel pivot
            $workspace->members()->attach($user->id, [
                'role' => $role,
                'created_at' => now(),
                'updated_at' => now(),
            ]);

            // 2. Berikan role Spatie khusus untuk workspace ini
            setPermissionsTeamId($workspace->id);
            
            $spatieRole = Role::firstOrCreate([
                'name' => ucfirst($role), // Contoh: 'Member'
                'workspace_id' => $workspace->id,
                'guard_name' => 'web'
            ]);

            $user->assignRole($spatieRole);
        });
    }
}