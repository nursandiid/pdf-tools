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
use setasign\Fpdi\Tcpdf\Fpdi;

class RotatePdf implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels, Progressable, Archivable;

    private string $folderPath = '/download/rotated/';

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
            $angle = (int) $this->attributes['rotation'];

            foreach ($this->files as $key => $file) {
                $pdf = new Fpdi();
                $pdf->setPrintHeader(false);
                $pdf->setPrintFooter(false);
                $pdf->setMargins(0, 0, 0);
                $pdf->setCellPadding(0);

                $pageCount = $pdf->setSourceFile(Storage::path($file));

                for ($pageNo = 1; $pageNo <= $pageCount; $pageNo++) {
                    $tpl = $pdf->importPage($pageNo);

                    /**
                     * @var int $width
                     * @var int $height
                     */
                    ['width' => $width, 'height' => $height] = $pdf->getTemplateSize($tpl);

                    // TODO: Calculate the center of the page rotation
                    $centerX = $width / 2;
                    $centerY = $height / 2;

                    if (in_array($angle, [90, -90])) {
                        $newOrientation = ($width > $height) ? 'P' : 'L';

                        $pdf->AddPage($newOrientation, [$width, $height]);
                        $pdf->setAutoPageBreak(true, 0);
                        $pdf->StartTransform();
                        $pdf->Rotate(-$angle, $centerY, $centerX);
                        $pdf->TranslateY(-$centerX + 16);
                        $pdf->TranslateX(-1.5);
                        $pdf->useTemplate($tpl, 45, 45);
                        $pdf->StopTransform();
                    } else if ($angle === 180) {
                        $newOrientation = ($width > $height) ? 'L' : 'P';

                        $pdf->AddPage($newOrientation, [$width, $height]);
                        $pdf->StartTransform();
                        $pdf->Rotate($angle, $centerX, $centerY);
                        $pdf->useTemplate($tpl);
                        $pdf->StopTransform();
                    } else {
                        $newOrientation = ($width > $height) ? 'L' : 'P';

                        $pdf->AddPage($newOrientation, [$width, $height]);
                        $pdf->useTemplate($tpl);
                    }
                }

                $downloadPath = $this->folderPath . \Str::uuid() . '.pdf';
                $outputPath = Storage::path($downloadPath);

                $pdf->Output($outputPath, 'F');

                array_push($archivedFiles, $downloadPath);

                remove_file($file);
                $this->updateProgress(count($this->files), $key + 1);
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
