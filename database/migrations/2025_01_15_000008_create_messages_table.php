<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('messages', function (Blueprint $table) {
            $table->id();
            $table->uuid('uuid')->unique();
            $table->foreignId('workspace_id')->constrained()->cascadeOnDelete();

            // Polymorphic target: Channel or Conversation
            $table->string('messageable_type');
            $table->unsignedBigInteger('messageable_id');

            $table->foreignId('user_id')->nullable()->constrained('users')->nullOnDelete();

            // Self-referencing parent for thread replies
            $table->foreignId('parent_id')->nullable()->constrained('messages')->nullOnDelete();

            $table->enum('type', ['text', 'system', 'file'])->default('text');
            $table->longText('content')->nullable();
            $table->boolean('is_edited')->default(false);
            $table->timestamp('edited_at')->nullable();
            $table->boolean('is_pinned')->default(false);
            $table->timestamp('pinned_at')->nullable();
            $table->foreignId('pinned_by')->nullable()->constrained('users')->nullOnDelete();
            $table->softDeletes();
            $table->timestamps();

            $table->index(['messageable_type', 'messageable_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('messages');
    }
};
