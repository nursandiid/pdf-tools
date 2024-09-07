<?php

namespace App\Jobs;

use App\Models\UploadLogs;
use App\Models\User;
use App\Traits\Progressable;
use App\Traits\Traits\Archivable;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Storage;
use setasign\Fpdi\Fpdi;

class SplitPdf implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels, Progressable, Archivable;

    private string $folderPath = '/download/split/';

    /**
     * Create a new job instance.
     */
    public function __construct(
        public ?User $user,
        public string $token,
        public array $files,
        public array $attributes
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
            $archivedFiles = [];

            foreach ($this->files as $key => $file) {
                $pdfInstance = new Fpdi();
                $pageCount = $pdfInstance->setSourceFile(Storage::path($file));
                
                for ($pageNo = 1; $pageNo <= $pageCount; $pageNo++) { 
                    $pages = $this->attributes['pages'];
                    $selectedPages = [];

                    if ($pages === 'all') {
                        $selectedPages = range(1, $pageCount);
                    } else {
                        foreach (explode(',', $pages) as $range) {
                            $selectedRange = explode('-', $range);
                            if (count($selectedRange) === 1) {
                                array_push($selectedPages, $range);
                            } else {
                                for ($i = $selectedRange[0]; $i < $selectedRange[1] + 1; $i++) {
                                    array_push($selectedPages, $i);
                                }
                            }
                        }
                    }

                    if (!in_array($pageNo, $selectedPages)) continue;

                    $pdf = new Fpdi();
                    $pdf->setSourceFile(Storage::path($file));

                    $tpl = $pdf->importPage($pageNo);
                    $size = $pdf->getTemplateSize($tpl);

                    $pdf->AddPage($size['width'] > $size['height'] ? 'L' : 'P', [$size['width'], $size['height']]);
                    $pdf->useTemplate($tpl);

                    $downloadPath = $this->folderPath . \Str::uuid() . '.pdf';
                    $outputPath = Storage::path($downloadPath);

                    $pdf->Output($outputPath, 'F');

                    array_push($archivedFiles, $downloadPath);
                    
                    $this->updateProgress(count($this->files), $key + 1);
                }

                remove_file($file);
            }

            if ($downloadPath = $this->archive($archivedFiles, $this->folderPath)) {
                UploadLogs::where('token', $this->token)
                    ->update([
                        'download_path' => $downloadPath
                    ]);
                
                $this->finishProgress();
            }
        } catch (\Exception $e) {
            array_map(fn ($file) => remove_file($file), $this->files);

            $this->failedProgress($e->getMessage());
        }
    }
}
