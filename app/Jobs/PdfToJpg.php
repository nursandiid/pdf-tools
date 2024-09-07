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
use Intervention\Image\Drivers\Imagick\Driver;
use Intervention\Image\ImageManager;
use Spatie\PdfToImage\Pdf;

class PdfToJpg implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels, Progressable, Archivable;

    private string $folderPath = '/download/pdf_to_jpg/';

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
            $quality = $this->attributes['quality'] === 'high' ? 100 : 75;

            foreach ($this->files as $key => $file) {
                $pdf = new Pdf(Storage::path($file));

                for ($i = 1; $i <= $pdf->pageCount(); $i++) {
                    $downloadPath = $this->folderPath . \Str::uuid() . '.png';
                    $outputPath = Storage::path($downloadPath);

                    $pdf->format(\Spatie\PdfToImage\Enums\OutputFormat::Png)
                        ->selectPage($i)
                        ->resolution(300)
                        ->save($outputPath);

                    // TODO: Compress quality
                    $manager = new ImageManager(new Driver);
                    $image = $manager->read($outputPath);
                    $image->toJpeg($quality);
                    $image->save();

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
