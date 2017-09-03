<?php

namespace App\Http\Controllers\Admin;

use Qintuap\Repositories\Factory as RepoFactory;
use Illuminate\Support\Str;

class JSONFetcher {
    
    protected $repos;
    
    public function __construct(RepoFactory $repos)
    {
        $this->repos = $repos;
    }
    
    function get($resources = [])
    {
        $data = [];
        foreach ($resources as $resource) {
            $method = 'get' . Str::camel($resource);
            $data[$resource] = $this->$method();
        }
        return $data;
    }
    
    function getPlayers()
    {
        return $this->repos->make('Pc')->all()->toJson();
    }
    
    function getClasses()
    {
        return $this->repos->make('CharacterClass')->all()->toJson();
    }
    
    function getRaces()
    {
        return $this->repos->make('Race')->all()->toJson();
    }
    
}
