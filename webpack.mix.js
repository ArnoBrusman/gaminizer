let mix = require('laravel-mix');
let path = require('path');
//var glob   = require('glob');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.js('resources/assets/js/admin/app.js', 'public/_admin/js')
//mix.sass('resources/assets/sass/app.scss', 'public/css');
//   .sass('resources/assets/sass/bootstrap/bootstrap-grid.scss', 'public/_admin/css')
//   .sass('resources/assets/sass/bootstrap/bootstrap-reboot.scss', 'public/_admin/css')
//   .sass('resources/assets/sass/bootstrap/bootstrap.scss', 'public/_admin/css')
//   .sass('resources/assets/sass/style.scss', 'public/_admin/css')
;
   
/* Folder mix: */
//    for (let file of glob.sync('resources/assets/sass/*.scss')) {
//        mix.sass(file, './public/css/');
//    }
mix.options({ processCssUrls: true })
mix.webpackConfig({
    resolve: {
        alias: {
            '@': path.resolve('resources/assets/js/admin')
        }
    }
});