<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class CharacterTest extends Model
{
  var $id;
  
  
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'level', 'class',
    ];
  
    static function findOrFail($id)
    {
      $character = new Character;
      $character->id = $id;
//      echo '<pre>' . print_r('action `find or fail` called', true) . '</pre>';
      return $character;
    }
}