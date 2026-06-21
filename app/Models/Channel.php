<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Str;

class Channel extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'uuid',
        'workspace_id',
        'created_by',
        'name',
        'slug',         // <-- Tambahan baru
        'description',
        'topic',        // <-- Tambahan baru
        'type',         // <-- Pengganti is_private
        'is_archived',  // <-- Tambahan baru
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

    public function workspace()
    {
        return $this->belongsTo(Workspace::class);
    }

    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function members()
    {
        return $this->belongsToMany(User::class, 'channel_members')->withTimestamps();
    }

    public function messages()
    {
        return $this->morphMany(Message::class, 'messageable');
    }
}