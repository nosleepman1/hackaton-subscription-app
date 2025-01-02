<?php

namespace App\Listeners;

use App\Events\InterrestAddedInTeamEvent;
use App\Notifications\InterrestAddedInTeam;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class InterrestAddedInTeamListener
{
    public function __construct() {}

    public function handle(InterrestAddedInTeamEvent $event): void
    {
        $event->user->notify(new InterrestAddedInTeam($event->team, $event->user));
    }
}
