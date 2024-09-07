<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class RouteServiceProvider extends ServiceProvider
{
    public const MERGE_PDF = 'merge_pdf';
    public const SPLIT_PDF = 'split_pdf';
    public const PDF_TO_JPG = 'pdf_to_jpg';
    public const JPG_TO_PDF = 'jpg_to_pdf';
    public const ROTATE_PDF = 'rotate_pdf';
    public const COMPRESS_PDF = 'compress_pdf';
    public const WORD_TO_PDF = 'word_to_pdf';
    public const POWERPOINT_TO_PDF = 'powerpoint_to_pdf';

    /**
     * Register services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        //
    }
}
