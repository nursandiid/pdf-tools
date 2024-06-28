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

        return "/storage/$directory/$fileName";
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
        $filePath = str_replace('/storage', '', $filePath);
        
        if ($filePath && Storage::exists($filePath)) {
            return Storage::delete($filePath);
        }

        return false;
    }
}