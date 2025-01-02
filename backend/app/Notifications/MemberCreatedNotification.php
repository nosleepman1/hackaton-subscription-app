<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use App\Models\Team;
use Illuminate\Database\Eloquent\Model;

class MemberCreatedNotification extends Notification
{
    use Queueable;

    /**
     * Create a new notification instance.
     */
    public function __construct(public Team $team, public Model $addedBy) {}

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
            ->subject('Vous avez été ajouté à une equipe')
            ->greeting('Bonjour ' . $notifiable->firstname.' '.$notifiable->lastname)
            ->line('Vous avez été ajouté à l\'equipe : ' . $this->team->name . ' par ' . $this->addedBy->firstname.' '.$this->addedBy->lastname)
            ->line('pour le projet : ' . $this->team->project->name)
            ->line('Merci pour votre participation!');
    }

}
