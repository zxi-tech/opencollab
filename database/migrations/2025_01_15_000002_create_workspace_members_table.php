<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('workspace_members', function (Blueprint $table) {
            $table->id();
            $table->foreignId('workspace_id')->constrained()->cascadeOnDelete();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();

            // NOTE: This simple role column is a Phase 1 placeholder.
            // Phase 2 introduces spatie/laravel-permission with the "teams"
            // feature scoped via workspace_id; this column will be migrated
            // to proper role/permission pivot tables at that point.
            $table->enum('role', ['owner', 'admin', 'moderator', 'member', 'guest'])->default('member');

            $table->enum('status', ['active', 'invited', 'suspended'])->default('active');
            $table->timestamp('joined_at')->nullable();
            $table->timestamps();

            $table->unique(['workspace_id', 'user_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('workspace_members');
    }
};
