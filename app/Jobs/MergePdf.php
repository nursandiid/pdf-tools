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
use setasign\Fpdi\Fpdi;

class MergePdf implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels, Progressable;

    private string $folderPath = '/download/merged/';

    /**
     * Create a new job instance.
     */
    public function __construct(
        public ?User $user,
        public string $token,
        public array $files
    )
    {
        //
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        $this->startProgress();
        try {
            $pdf = new Fpdi();

            foreach ($this->files as $key => $file) {
                $pageCount = $pdf->setSourceFile(Storage::path($file));
                
                for ($pageNo = 1; $pageNo <= $pageCount; $pageNo++) { 
                    $tpl = $pdf->importPage($pageNo);
                    $size = $pdf->getTemplateSize($tpl);

                    $pdf->AddPage($size['width'] > $size['height'] ? 'L' : 'P', [$size['width'], $size['height']]);
                    $pdf->useTemplate($tpl);
                }

                remove_file($file);
                $this->updateProgress(count($this->files), $key + 1);
            }

            $downloadPath = $this->folderPath . \Str::uuid() . '.pdf';
            $outputPath = Storage::path($downloadPath);

            $pdf->Output($outputPath, 'F');

            UploadLogs::where('token', $this->token)
                ->update([
                    'download_path' => $downloadPath
                ]);
            
            $this->finishProgress();
        } catch (\Exception $e) {
            array_map(fn ($file) => remove_file($file), $this->files);

            $this->failedProgress($e->getMessage());
        }
    }
}
