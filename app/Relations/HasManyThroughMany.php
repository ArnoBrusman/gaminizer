<?php

namespace Advanza\Relations;

use Illuminate\Database\Eloquent\Relations\HasManyThrough;

/**
 * UNFINISHED. does not yet work
 * @author arno
 */
class HasManyThroughMany extends HasManyThrough {
    
    /**
     * Get the results of the relationship.
     *
     * @return mixed
     */
    public function getResults()
    {
        return $this->first();
    }
}
