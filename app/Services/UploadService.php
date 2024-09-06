<?php

namespace App\Services;

use App\Models\UploadLogs;

class UploadService
{
    /**
     * Upload files into storage
     *
     * @param string $token
     * @param array $files
     * @param string $directory
     * @param string $service
     * 
     * @return string[]
     */
    public function handle(string $token, array $files, string $directory, string $service)
    {
        try {
            $log = UploadLogs::create([
                'user_id' => auth()->id(),
                'token' => $token,
                'total' => count($files),
                'processing' => 0,
                'service' => $service,
                'status' => UploadLogs::PROCESSING
            ]);

            $uploadedFiles = [];

            /**
             * @var \Illuminate\Http\UploadedFile $file
             */
            foreach ($files as $key => $file) {
                $currentFile = [
                    'file_name' => $file->getClientOriginalName(),
                    'file_size' => $file->getSize()
                ];

                if ($key === 0) {
                    event(new \App\Events\UploadProcessing(
                        user: auth()->user(),
                        token: $token,
                        data: [
                            'total' => $log->total,
                            'processing' => 1,
                            'file' => $currentFile
                        ]
                    ));
                }

                $log->increment('processing');
                $log->save();

                array_push($uploadedFiles, upload_file($file, $directory));

                if (config('app.env') === 'local') sleep(1);

                event(new \App\Events\UploadProcessing(
                    user: auth()->user(),
                    token: $token,
                    data: [
                        'total' => $log->total,
                        'processing' => $log->processing < $log->total ? $log->processing + 1 : $log->processing,
                        'file' => $currentFile
                    ]
                ));
            }
            
            return $uploadedFiles;
        } catch (\Exception $e) {
            throw new \Exception($e->getMessage());
        }
    }
}