<?php

namespace App\Http\Controllers;

class TestController extends Controller {
    
    function test()
    {
        $statsCollection = \Gaminizer\PcStats::all();
        
        \Debugbar::info($statsCollection->statTypeResults());
        $types = $statsCollection->statTypeResults();
        
        return response($types)->header('Content-type', 'application/json');
        return response('test')->header('Content-type', 'text/html');
    }
    
}
