<?php

namespace Gaminizer\ViewComposers;

use Illuminate\Contracts\Cache\Repository;
use Illuminate\View\View;

/**
 * Description of AdminComposer
 *
 * @author Arno
 */
class AdminComposer extends BaseComposer {
    
    var $cache;
    
    public function __construct(Repository $cache)
    {
        $this->cache = $cache;
    }
    
    function compose(View $view)
    {
        return parent::compose($view);
    }
    
}
