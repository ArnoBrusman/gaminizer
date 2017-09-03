<?php

namespace Advanza\Relations;

use Illuminate\Database\Eloquent\Relations\HasManyThrough;

/**
 * @author arno
 */
class HasOneThrough extends HasManyThrough {
    
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
