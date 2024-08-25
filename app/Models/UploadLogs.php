<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UploadLogs extends Model
{
    use HasFactory;

    public const PROCESSING = 'processing';
    public const SUCCESS = 'success';
    public const FAILED = 'failed';
    public const DELETED = 'deleted';

    protected $guarded = ['id'];
}
