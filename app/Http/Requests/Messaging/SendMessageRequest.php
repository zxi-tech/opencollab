<?php

namespace App\Http\Requests\Messaging;

use Illuminate\Foundation\Http\FormRequest;

class SendMessageRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'content' => ['required', 'string'],
            // Wajib diisi JIKA channel_id kosong
            'receiver_id' => ['required_without:channel_id', 'nullable', 'integer', 'exists:users,id'],
            // Wajib diisi JIKA receiver_id kosong
            'channel_id' => ['required_without:receiver_id', 'nullable', 'integer', 'exists:channels,id'],
        ];
    }
}