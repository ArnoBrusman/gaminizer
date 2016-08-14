<?php

namespace Gaminizer\ViewComposers;

use Illuminate\View\View;

class SheetComposer extends TwigComposer
{
  var $character;
  
  public function __construct() {
    
    $this->data['views'] = [
        'sheet/sheetheader.twig',
        'sheet/skills.twig',
        'sheet/ability_scores.twig'
        ];
  }
  
    
    /**
     * Bind data to the view.
     *
     * @param  View  $view
     * @return void
     */
    public function compose(View $view)
    {
        $data = $this->getData();
        $view->with($data);
    }
}