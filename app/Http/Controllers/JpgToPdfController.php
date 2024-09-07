<?php

namespace App\Http\Controllers;

use App\Providers\RouteServiceProvider;
use App\Services\UploadService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class JpgToPdfController extends Controller
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
            return Inertia::render('jpg-to-pdf/Index');
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
                directory: 'download/jpg_to_pdf',
                service: RouteServiceProvider::JPG_TO_PDF
            );
            
            dispatch(new \App\Jobs\JpgToPdf(
                user: auth()->user(),
                token: $token,
                files: $files,
                attributes: $request->only('orientation', 'margin')
            ));

            return to_route(RouteServiceProvider::JPG_TO_PDF, compact('token'));
        } catch (\Exception $e) {
            return back()->with([
                'error_msg' => $e->getMessage()
            ]);
        }
    }
}
