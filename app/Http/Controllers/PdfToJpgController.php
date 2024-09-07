<?php

namespace App\Http\Controllers;

use App\Providers\RouteServiceProvider;
use App\Services\UploadService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PdfToJpgController extends Controller
{
    public function __construct(private UploadService $uploadService)
    {
        //
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            return Inertia::render('pdf-to-jpg/Index');
        } catch (\Exception $e) {
            return back()->with([
                'error_msg' => $e->getMessage()
            ]);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            $token = $request->token;
            $files = $this->uploadService->handle(
                token: $token,
                files: $request->file('files'),
                directory: 'download/pdf_to_jpg',
                service: RouteServiceProvider::PDF_TO_JPG
            );
            
            dispatch(new \App\Jobs\PdfToJpg(
                user: auth()->user(),
                token: $token,
                files: $files,
                attributes: $request->only('quality')
            ));

            return to_route(RouteServiceProvider::PDF_TO_JPG, compact('token'));
        } catch (\Exception $e) {
            return back()->with([
                'error_msg' => $e->getMessage()
            ]);
        }
    }
}
