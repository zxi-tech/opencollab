<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Str;

class Workspace extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'uuid',
        'owner_id',
        'name',
        'slug',
        'description',
        'logo',
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

    public function owner()
    {
        return $this->belongsTo(User::class, 'owner_id');
    }

    /**
     * Get the members of the workspace.
     */
    public function members()
    {
        return $this->belongsToMany(User::class, 'workspace_members')
                    ->withPivot('role')
                    ->withTimestamps();
    }

    /**
     * Get the conversations for the workspace.
     */
    public function conversations()
    {
        return $this->hasMany(Conversation::class);
    }
}