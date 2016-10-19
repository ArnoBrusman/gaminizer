<?php

return [
    'libraries' => [
        // OPTIMIZE: Grab from google library, but with a fallback option
        'jquery' => 'http://ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.js',
        'jqueryui' => ['file' => 'ui/jquery-ui.js', 'require' => 'jquery' ],
        'bootstrap_core' => ['file' => 'bootstrap.min.js', 'require' => 'jquery'],
        'bootstrap' => ['file' => 'bootstrap-button-conflict.js', 'require' => 'bootstrap_core'],
        'underscore' => [ 'file' => 'underscore-min.js', 'require' => 'jquery'],
        'backbone' => [ 'file' => 'backbone-min.js', 'require' => 'underscore'],
        'smartwidgets' => [ 'file' => 'smartwidgets/jarvis.widget.min.js', 'require' => 'jquery'],
        'bbgetters' => ['file' => 'plugins/backbone.getters.js', 'require' => 'backbone'],
        //jquery plugins
        'isloading' => [ 'file' => 'lib/jquery.isloading.js', 'require' => 'jquery'],
        'moxie' => [ 'file' => 'lib/plupload/moxie.min.js', 'require' => 'jquery'],
        'plupload_core' => [ 'file' => 'lib/plupload/plupload.js', 'require' => ['jquery','moxie']],
        'plupload' => [ 'file' => 'lib/plupload/jquery.ui.plupload/jquery.ui.plupload.js', 'require' => ['plupload_core', 'jqueryui']],
        'redirect' => ['file' => 'lib/redirect.js', 'require' => 'jquery'],
        'imgareaselect' => ['file' => 'lib/jquery.imgareaselect.min.js', 'require' => 'jquery'],
        'selectize' => ['file' => 'lib/selectize/selectize.js', 'require' => 'jquery'],
        'match_height' => ['file' => 'lib/match-height/jquery.match-height.js', 'require' => 'jquery'],
        'nestable' => ['file' => 'lib/jquery-nestable/jquery.nestable.min.js', 'require' => 'jquery'],
        'jqform' => ['file' => 'lib/jquery-form/jquery-form.min.js', 'require' => 'jquery'],
        'validate' => ['file' => 'lib/jquery-validate/jquery.validate.min.js', 'require' => ['jquery', 'jqform']],
        'fancyboxy' => ['file' => 'lib/fancybox/jquery.fancybox.js', 'require' => ['jquery']],
        // flot (http://www.flotcharts.org/)
        'flot_cust' => ['file' => 'lib/flot/jquery.cust.min.js', 'require' => 'jquery'],
        'flot_resize' => ['file' => 'lib/flot/jquery.resize.min.js', 'require' => 'jquery'],
        'flot_time' => ['file' => 'lib/flot/jquery.time.min.js', 'require' => 'jquery'],
        'flot_tooltip' => ['file' => 'lib/flot/jquery.tooltip.min.js', 'require' => 'jquery'],
        //custom plugins
        
        
        //application libraries
        'piwila' => ['file' => 'piwila.js', 'require' => ['backbone', 'jquery', 'bbgetters']],
        'picturelib' => ['file' => 'picture.lib.js', 'require' => ['piwila', 'redirect', 'imgareaselect']]
        ]];

