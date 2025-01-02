<?php

namespace App\Listeners;

use App\Events\TeamCreatedEvent;
use App\Notifications\TeamCreatedNotification;
use Illuminate\Contracts\Queue\ShouldQueue;

class TeamCreatedListener implements ShouldQueue 
{
    /**
     * Create the event listener.
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     */
    public function handle(TeamCreatedEvent $event): void
    {
        $event->user->notify(new TeamCreatedNotification($event->team, $event->user));
    }
}