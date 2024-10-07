<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class HighPriorityNotification extends Mailable
{
    use Queueable, SerializesModels;

    public string $recipientName;
    public string $messageBody;

    /**
     * Create a new message instance.
     *
     * @param string $recipientName
     * @param string $messageBody
     */
    public function __construct(string $recipientName, string $messageBody)
    {
        $this->recipientName = $recipientName;
        $this->messageBody = $messageBody;
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'High Priority Notification',
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            view: 'emails.high_priority_notification', 
            with: [
                'name' => $this->recipientName,
                'message' => $this->messageBody,
            ],
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        return [];
    }
}
