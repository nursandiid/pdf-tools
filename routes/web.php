<?php

use App\Http\Controllers\HomeController;
use App\Http\Controllers\MergePdfController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [HomeController::class, 'index']);

Route::get('/merge-pdf', [MergePdfController::class, 'index'])->name('merge_pdf');
Route::post('/merge-pdf', [MergePdfController::class, 'store'])->name('merge_pdf.store');
Route::get('/split_pdf', fn () => 'page of split_pdf')->name('split_pdf');
Route::get('/pdf_to_jpg', fn () => 'page of pdf_to_jpg')->name('pdf_to_jpg');
Route::get('/jgp_to_pdf', fn () => 'page of jgp_to_pdf')->name('jgp_to_pdf');
Route::get('/rotate_pdf', fn () => 'page of rotate_pdf')->name('rotate_pdf');
Route::get('/compress_pdf', fn () => 'page of compress_pdf')->name('compress_pdf');
Route::get('/word_to_pdf', fn () => 'page of word_to_pdf')->name('word_to_pdf');
Route::get('/powerpoint_to_pdf', fn () => 'page of powerpoint_to_pdf')->name('powerpoint_to_pdf');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
