<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Str;

class Message extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'uuid',
        'workspace_id',
        'user_id', // <--- UBAH DI SINI (sebelumnya sender_id)
        'messageable_type',
        'messageable_id',
        'content',
    ];

    protected static function boot()
    {
        parent::boot();
        static::creating(function ($model) {
            if (empty($model->uuid)) {
                $model->uuid = (string) Str::uuid();
            }
        });
    }

    public function sender()
    {
        // Beritahu Laravel bahwa foreign key-nya adalah user_id
        return $this->belongsTo(User::class, 'user_id'); 
    }

    public function messageable()
    {
        return $this->morphTo();
    }
}