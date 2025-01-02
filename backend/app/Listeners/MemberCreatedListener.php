<?php

namespace App\Listeners;

use App\Events\MemberCreatedEvent;
use App\Notifications\MemberCreatedNotification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class MemberCreatedListener implements ShouldQueue
{
    /**
     * Create the event listener.
     */
    public function __construct() {
        //
    }

    /**
     * Handle the event.
     */
    public function handle(MemberCreatedEvent $event): void {

        $notifiable = $event->member->user_id 
            ? $event->member->user 
            : $event->member->teamMate;

        $notifiable->notify(new MemberCreatedNotification($event->member->team, $event->addedBy));
    }
}
