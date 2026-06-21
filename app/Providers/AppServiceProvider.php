<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Repositories\Contracts\UserRepositoryInterface;
use App\Repositories\Eloquent\UserRepository;
use App\Repositories\Contracts\WorkspaceRepositoryInterface;
use App\Repositories\Eloquent\WorkspaceRepository;
use App\Repositories\Contracts\MessageRepositoryInterface;
use App\Repositories\Eloquent\MessageRepository;
use App\Repositories\Contracts\ChannelRepositoryInterface;
use App\Repositories\Eloquent\ChannelRepository;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->bind(UserRepositoryInterface::class, UserRepository::class);
        $this->app->bind(UserRepositoryInterface::class, UserRepository::class);
        $this->app->bind(WorkspaceRepositoryInterface::class, WorkspaceRepository::class);
        $this->app->bind(MessageRepositoryInterface::class, MessageRepository::class);
        $this->app->bind(ChannelRepositoryInterface::class, ChannelRepository::class);
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}