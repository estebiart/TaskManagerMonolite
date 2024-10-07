<?php


namespace App\Mail;

use App\Models\Task;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class HighPriorityNotification extends Mailable
{
    use Queueable, SerializesModels;

    protected $task;

    public function __construct(Task $task)
    {
        $this->task = $task;
    }

    public function build()
    {
        return $this->subject('Tarea de Alta Prioridad Creada')
                    ->view('emails.high_priority_notification')
                    ->with([
                        'taskTitle' => $this->task->title,
                        'taskDescription' => $this->task->description,
                        'taskDeadline' => $this->task->deadline,
                    ]);
    }
}
