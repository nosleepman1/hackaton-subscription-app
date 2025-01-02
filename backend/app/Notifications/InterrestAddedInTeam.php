<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use App\Models\Team;
use App\Models\User;

class InterrestAddedInTeam extends Notification
{
    use Queueable;

    /**
     * Create a new notification instance.
     */
    public function __construct(public Team $team, public User $user) {}

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
            ->greeting('Bonjour '.$notifiable->name.' '.$notifiable->last_name)
            ->line($this->user->name.' '.$this->user->last_name.' vient de vous ajouter comme membre de son équipe '.$this->team->name)
            ->line('Merci!');
    }
}
