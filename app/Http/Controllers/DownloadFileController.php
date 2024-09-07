<?php

namespace App\Http\Controllers;

use App\Models\UploadLogs;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DownloadFileController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(string $token)
    {
        try {
            $log = UploadLogs::where('token', $token)->first();
            if (!$log) {
                throw new \Exception('Invalid token');
            }

            return Inertia::render('download/Index', [
                'service' => $log->service,
                'download_path' => $log->download_path
            ]);
        } catch (\Exception $e) {
            return back()->with([
                'error_msg' => $e->getMessage()
            ]);
        }
    }
}
