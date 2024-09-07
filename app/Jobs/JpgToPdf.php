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
use Intervention\Image\Drivers\Imagick\Driver;
use Intervention\Image\ImageManager;
use TCPDF;

class JpgToPdf implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels, Progressable;

    private string $folderPath = '/download/jpg_to_pdf/';

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
            $pdf = new TCPDF();
            $pdf->setPrintHeader(false);
            $pdf->setPrintFooter(false);
            $pdf->setMargins(0, 0, 0);
            $pdf->setCellPadding(0);

            /**
             * @var int $margin
             * @var int $orientation
             */
            ['margin' => $margin, 'orientation' => $orientation] = $this->attributes;

            foreach ($this->files as $key => $file) {
                $outputImage = $this->folderPath . \Str::uuid() . '.pdf';
                $manager = new ImageManager(new Driver);
                $image = $manager->read(Storage::path($file));

                $width = 2480;
                $height = $width / $image->width() * $image->height();

                $image->resize(width: $width, height: $height);
                $image->toPng();
                $image->save(Storage::path($outputImage));

                $pdf->AddPage($orientation);
                $pdf->setAutoPageBreak(true, 0);

                // TODO: Convert px to mm
                $newWidth = $width * (25.4 / 300) - $margin;
                $newHeight = $height * (25.4 / 300) - $margin;

                $pdf->Image(
                    file: Storage::path($outputImage),
                    w: $newWidth,
                    h: $newHeight,
                    x: ($pdf->getPageWidth() - $newWidth) / 2,
                    y: ($pdf->getPageHeight() - $newHeight) / 2,
                    type: 'PNG',
                    palign: 'C',
                    resize: true
                );

                remove_file($outputImage);
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
