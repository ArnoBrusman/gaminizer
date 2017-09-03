<?php

namespace App\Http\Controllers\Api;

use Gaminizer\CharacterClass;

class ClassesController extends Controller
{
    var $model = 'CharacterClass';
    
    protected $only = ['name','description','description_short','hit_die','caster_type','spell_ability','parent_id','type'];
}
