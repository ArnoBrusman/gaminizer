<?php

namespace Gaminizer\Providers;

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

        // Using Closure based composers...
//        view()->composer('dashboard', function ($view) {
//            //
//        });
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