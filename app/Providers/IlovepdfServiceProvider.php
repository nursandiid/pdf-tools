<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Ilovepdf\Ilovepdf;

class IlovepdfServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        $this->app->singleton(Ilovepdf::class, function ($app) {
            return new Ilovepdf(
                publicKey: env('ILOVEPDF_PUBLIC_KEY'),
                secretKey: env('ILOVEPDF_SECRET_KEY')
            );
        });
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        //
    }
}
