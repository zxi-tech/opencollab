<?php

namespace App\Http\Requests\Workspace;

use Illuminate\Foundation\Http\FormRequest;

class AddMemberRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true; // Penting agar tidak 403 Forbidden
    }

    public function rules(): array
    {
        return [
            // Memastikan email diisi, formatnya benar, dan terdaftar di tabel users
            'email' => ['required', 'email', 'exists:users,email'],
        ];
    }
}