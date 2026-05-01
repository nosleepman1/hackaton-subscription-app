<?php

namespace App\Listeners;

use App\Events\MemberCreatedEvent;
use App\Notifications\MemberCreatedNotification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class MemberCreatedListener
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
    public function handle(MemberCreatedEvent $event): void
    {
        $event->member->user->notify(new MemberCreatedNotification($event->member->team, $event->member->user));
    }
}
