<?php

namespace App\Http\Controllers;

use App\Models\UploadLogs;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class ActivityController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        try {
            $search = str_replace(' ', '_', $request->search);
            $logs = UploadLogs::user()
                ->when(
                    value: $request->filled('search'),
                    callback: fn ($query) => $query->where('service', 'LIKE', "%$search%")
                )
                ->orderBy('created_at', 'desc');

            if ($request->rows === 'all') {
                $logs = ['data' => $logs->get()];
            } else {
                $logs = $logs->paginate(
                        perPage: $request->rows ?? 10, 
                        page: $request->page ?? 1
                    )
                    ->withQueryString();
            }

            return Inertia::render('activity/Index', [
                'data' => $logs
            ]);
        } catch (\Exception $e) {
            return back()->with([
                'error_msg' => $e->getMessage()
            ]);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(int $id)
    {
        DB::beginTransaction();
        try {
            $log = UploadLogs::find($id);
            if (!$log) {
                throw new \Exception('Invalid ID');
            }

            $log->update([
                'download_path' => null,
                'status' => UploadLogs::DELETED
            ]);
    
            DB::commit();

            return back()->with([
                'success_msg' => 'Task deleted successfully'
            ]);
        } catch (\Exception $e) {
            DB::rollBack();

            return back()->with([
                'error_msg' => $e->getMessage()
            ]);
        }
    }
}
