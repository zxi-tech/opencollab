<?php

namespace App\Http\Requests\Messaging;

use Illuminate\Foundation\Http\FormRequest;

class SendMessageRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true; // Proteksi utama menggunakan middleware auth:sanctum
    }

    public function rules(): array
    {
        return [
            // Memastikan receiver_id wajib diisi, berupa integer, dan terdaftar di tabel users
            'receiver_id' => ['required', 'integer', 'exists:users,id'],
            'content' => ['required', 'string'],
        ];
    }
}