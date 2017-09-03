<?php

namespace App\Models\Presenter;

use Gaminizer\Sheet;
use McCool\LaravelAutoPresenter\BasePresenter;

class SheetPresenter extends BasePresenter
{
  
  public function __construct(array $attributes = array()) {
    parent::__construct($attributes);
  }
  
}
