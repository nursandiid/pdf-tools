<?php

use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

if (!function_exists('upload_file')) {
    /**
     *
     * @param \Illuminate\Http\UploadedFile $file
     * @param string $directory
     * @return string
     */
    function upload_file($file, $directory)
    {
        $extension = $file->getClientOriginalExtension();
        $fileName = Str::uuid() . '.' . $extension;

        Storage::putFileAs($directory, $file, $fileName);

        return "/$directory/$fileName";
    }
}

if (!function_exists('remove_file')) {
    /**
     *
     * @param string $filePath
     * @return boolean
     */
    function remove_file($filePath)
    {
        if ($filePath && Storage::exists($filePath)) {
            return Storage::delete($filePath);
        }

        return false;
    }
}

if (!function_exists('calculate_percentage')) {
    /**
     *
     * @param int $total
     * @param int $processing
     * 
     * @return int
     */
    function calculate_percentage($total, $processing) {
        if ($total === 0) return 0;

        return round($processing / $total * 100, 2);
    }
}