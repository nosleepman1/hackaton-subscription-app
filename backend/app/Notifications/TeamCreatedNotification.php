<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use App\Models\Team;
use App\Models\User;


class TeamCreatedNotification extends Notification
{
    use Queueable;

    /**
     * Create a new notification instance.
     */
    

    public function __construct(
        public Team $team, 
        public User $user)
    {
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
            ->subject("Félicitations, votre équipe a été créée !")
            ->line("Bonjour " . $this->user->firstname . " " . $this->user->lastname)
            ->line("Votre équipe " . $this->team->name . " a été créée avec succès !")
            ->line('Nous vous remercions de votre participation au hackathon');
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            //
        ];
    }
}
