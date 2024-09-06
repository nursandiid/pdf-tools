<?php

namespace App\Traits;

use App\Models\UploadLogs;

trait Progressable
{
    public function startProgress()
    {
        event(new \App\Events\TaskProcessing(
            user: $this->user,
            token: $this->token,
            percentage: 0
        ));
    }

    public function updateProgress(int $total, int $processing)
    {
        if ($this->token) {
            event(new \App\Events\TaskProcessing(
                user: $this->user,
                token: $this->token,
                percentage: calculate_percentage($total, $processing)
            ));
        }
    }

    public function finishProgress()
    {
        UploadLogs::whereToken($this->token)->update([
            'status' => UploadLogs::SUCCESS
        ]);

        event(new \App\Events\TaskProcessedSuccessfully(
            user: $this->user,
            token: $this->token
        ));
    }

    public function failedProgress(string $message)
    {
        UploadLogs::whereToken($this->token)->update([
            'status' => UploadLogs::FAILED
        ]);

        event(new \App\Events\TaskProcessingFailed(
            user: $this->user,
            token: $this->token,
            message: $message
        ));
    }
}
