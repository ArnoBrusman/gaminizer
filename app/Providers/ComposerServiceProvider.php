<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class ComposerServiceProvider extends ServiceProvider
{
    /**
     * Register bindings in the container.
     *
     * @return void
     */
    public function boot()
    {
        // Using class based composers...
        view()->composer(
            'sheet', 'Gaminizer\ViewComposers\SheetComposer'
        );
        view()->composer(
            'init', 'Gaminizer\ViewComposers\InitComposer'
        );
//        view()->composer(
//            ['admin.*'], 'Gaminizer\ViewComposers\AdminComposer'
//        );

    }

    /**
     * Register the service provider.
     *
     * @return void
     */
    public function register()
    {
        //
    }
    
}