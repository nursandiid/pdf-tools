<?php

namespace App\Jobs;

use App\Models\UploadLogs;
use App\Models\User;
use App\Traits\Progressable;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Storage;
use Ilovepdf\Ilovepdf;
use Ilovepdf\OfficepdfTask;

class OfficeToPdf implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels, Progressable;

    /**
     * Create a new job instance.
     */
    public function __construct(
        public ?User $user,
        public string $token,
        public array $files,
        public string $folderPath
    )
    {
        //
    }

    /**
     * Execute the job.
     */
    public function handle(Ilovepdf $ilovepdf): void
    {
        $this->startProgress();
        try {
            $fileName = \Str::uuid();

            /**
             * @var OfficepdfTask $task
             */
            $task = $ilovepdf->newTask('officepdf');

            foreach ($this->files as $file) {
                $task->addFile(Storage::path($file));
                remove_file($file);
            }

            if (count($this->files) > 1) $task->setPackagedFilename(str_replace('-', '_', \Str::uuid()));
            else $task->setOutputFilename($fileName);

            $task->execute();
            $task->download(Storage::path($this->folderPath));

            UploadLogs::where('token', $this->token)
                ->update([
                    'download_path' => $this->folderPath . $task->outputFileName
                ]);
            
            $this->finishProgress();
        } catch (\Exception $e) {
            array_map(fn ($file) => remove_file($file), $this->files);

            $this->failedProgress($e->getMessage());
        }
    }
}
