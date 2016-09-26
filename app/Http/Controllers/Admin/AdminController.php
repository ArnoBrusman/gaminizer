<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;

/**
 * Description of AdminController
 *
 * @author Arno
 */
class AdminController extends Controller {
    
    function index()
    {
        return view('admin.index');
    }
    
    function narratives()
    {
        return view('admin.narratives');
    }
    
    function races()
    {
        return view('admin.races');
    }
    
    function feats()
    {
        return view('admin.feats');
    }
    
    function classes()
    {
        return view('admin.classes');
    }
    
}
