<?php


namespace Gaminizer\ViewComposers;

use Illuminate\View\View;
use Gaminizer\Proficiency;
use Gaminizer\Narrative;
use Gaminizer\CharacterClass;
use Gaminizer\Race;

/**
 * Description of BaseComposer
 *
 * @author Arno
 */
class BaseComposer extends TwigComposer {

    /**
     * Bind data to the view.
     *
     * @param  View  $view
     * @return void
     */
    public function compose(View $view)
    {
        $view->with([
            'page' => $this,
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
