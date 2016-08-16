<?php

namespace Gaminizer\ViewComposers;

use Illuminate\View\View;

class SheetComposer extends TwigComposer
{
    var $character;

    public function __construct() 
    {
        $this->data['views'] = [
            'sheet/sheetheader.twig',
            'sheet/ability_scores.twig',
            'sheet/armor.twig',
            'sheet/deathsaves.twig',
            'sheet/hitdice.twig',
            'sheet/hitpoints.twig',
            'sheet/initiative.twig',
            'sheet/resources.twig',
            'sheet/saves.twig',
            'sheet/skills.twig',
            'sheet/spellslots.twig',
            'sheet/various1.twig',
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
        $data['function_test'] = function() { return 'function works'; };
        $view->with($data);
    }
    
}