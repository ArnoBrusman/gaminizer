<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Qintuap\Repositories\Factory as RepoFactory;
/**
 * Description of AdminController
 *
 * @author Arno
 */
class AdminController extends Controller {
    
    protected $resource_map = [
        'admin/players/*' => ['players','classes','races']
    ];
    
    protected $repos;
    protected $request;
    
    public function __construct(Request $request, RepoFactory $repos)
    {
        $this->request = $request;
        $this->repos = $repos;
    }
    
    function index()
    {
        return view('vue.index');
    }
    
    function admin()
    {
        return view('admin.genius',[
            'token' => csrf_token(),
            'js_resources' => [],
        ]);
    }
    
    function any()
    {
        
        return view('admin.genius',[
            'token' => csrf_token(),
            'js_resources' => $this->getJson(),
        ]);
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
    
    function getJson()
    {
        $uri = $this->request->path();
        $resources = array_flatten(array_values(array_filter($this->resource_map, function($key) use ($uri) {
            return preg_match('~'.$key.'~', $uri);
        },ARRAY_FILTER_USE_KEY)));
        
        $fetcher = $this->getFetcher();
        $d = $fetcher->get($resources);
        return $d;
    }
    
    protected function getFetcher()
    {
        return new JSONFetcher($this->repos);
    }
    
}
