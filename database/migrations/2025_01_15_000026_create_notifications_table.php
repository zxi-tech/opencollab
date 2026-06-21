<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('notifications', function (Blueprint $table) {
            $table->id();
            $table->uuid('uuid')->unique();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete(); // recipient
            $table->enum('type', ['message', 'mention', 'meeting_invitation', 'task_assignment', 'file_shared']);
            $table->string('title');
            $table->text('body')->nullable();
            $table->json('data')->nullable(); // extra payload: route, related ids, etc.
            $table->timestamp('read_at')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('notifications');
    }
};
