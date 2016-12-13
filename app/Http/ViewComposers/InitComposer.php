<?php

namespace Gaminizer\ViewComposers;

use Illuminate\View\View;
use Gaminizer\Proficiency;
use Gaminizer\Narrative;
use Gaminizer\CharacterClass;
use Gaminizer\Race;

class InitComposer extends BaseComposer
{
    var $character;

    public function __construct() 
    {
        \Debugbar::info('init composer called');
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
        $view = parent::compose($view);
        $data = $this->getData();
        $view->with($data);
        $view->with([
            'csrf_token' => csrf_token(),
            'hr_stats' => json_encode(config('character.hr_stats')),
            'core_proficiencies' => Proficiency::core(),
            'core_narratives' => Narrative::core(),
            'core_classes' => CharacterClass::core(),
            'core_races' => Race::core()
            ]);
        
        return $view;
    }
    
}