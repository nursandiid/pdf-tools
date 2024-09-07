<?php

use App\Models\UploadLogs;
use App\Providers\RouteServiceProvider;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('upload_logs', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id')->nullable();
            $table->string('token');
            $table->integer('total');
            $table->integer('processing');
            $table->enum('service', [
                RouteServiceProvider::MERGE_PDF,
                RouteServiceProvider::SPLIT_PDF,
                RouteServiceProvider::PDF_TO_JPG,
                RouteServiceProvider::JPG_TO_PDF,
                RouteServiceProvider::ROTATE_PDF,
                RouteServiceProvider::COMPRESS_PDF,
                RouteServiceProvider::WORD_TO_PDF,
                RouteServiceProvider::POWERPOINT_TO_PDF,
            ]);
            $table->enum('status', [
                UploadLogs::PROCESSING,
                UploadLogs::SUCCESS,
                UploadLogs::FAILED,
                UploadLogs::DELETED,
            ]);
            $table->string('download_path')->nullable();
            $table->timestamps();

            $table->foreign('user_id')
                  ->references('id')
                  ->on('users')
                  ->onUpdate('cascade')
                  ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('upload_logs');
    }
};
