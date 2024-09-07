<?php

namespace App\Traits\Traits;

use Illuminate\Support\Facades\Storage;
use ZipArchive;

trait Archivable
{
    /**
     * Archive files into a zip file
     *
     * @param array $files
     * @param string $directory
     * 
     * @return string|void
     */
    public function archive(array $files, string $directory)
    {
        try {
            $fileZip = $directory . \Str::uuid() . '.zip';
            $zip = new ZipArchive();
            
            if (true === ($zip->open(Storage::path($fileZip), ZipArchive::CREATE | ZipArchive::OVERWRITE))) {
                foreach ($files as $key => $file) {
                    $zip->addFile(Storage::path($file), $key + 1 .'.'. pathinfo($file, PATHINFO_EXTENSION));
                }

                if ($zip->numFiles === 0) {
                    throw new \Exception('File not found');
                }

                $zip->close();
            }

            return $fileZip;
        } catch (\Exception $e) {
            throw new \Exception($e->getMessage());
        }
    }
}
