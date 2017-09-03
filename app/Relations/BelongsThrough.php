<?php

namespace Advanza\Relations;

use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;

/**
 * Define a 'belongs to' relation, but through a mediating table. 
 * Additional: local key is determined the foreign key name by default, instead of being the parent key.
 * Hack from belongsToMany. Assumes that foreign key with same name is defined on parent.
 * @author arno
 */
class BelongsThrough extends BelongsToMany {
    
    protected $localKey;

    public function __construct(Builder $query, Model $parent, $table, $foreignKey, $otherKey, $localKey = null, $relationName = null)
    {
        
        $this->localKey = $localKey;
        parent::__construct($query, $parent, $table, $foreignKey, $otherKey,
                $relationName);
    }
    
    public function associate($model, array $attributes = [], $touch = true)
    {
        
        $otherKey = ($model instanceof Model ? $model->getKey() : $model);

        $this->parent->setAttribute($this->localKey, $otherKey);

        if ($model instanceof Model) {
            $this->parent->setRelation($this->relationName, $model);
        }
        
        return $this->parent;
    }
    
    /**
     * Dissociate previously associated model from the given parent.
     *
     * @return \Illuminate\Database\Eloquent\Model
     */
    public function dissociate()
    {
        $this->parent->setAttribute($this->foreignKey, null);

        return $this->parent->setRelation($this->relation, null);
    }
    
    /**
     * Get the results of the relationship.
     *
     * @return mixed
     */
    public function getResults()
    {
        return $this->first();
    }
    
    /**
     * Set the where clause for the relation query.
     *
     * @return $this
     */
    protected function addWhereConstraints()
    {
        $this->query->where(
            $this->getQualifiedForeignKeyName(), '=', $this->getLocalForeignKey()
        );

        return $this;
    }
    
    protected function getLocalForeignKey()
    {
        return $this->parent->getAttribute($this->localKey);
    }
    
    /**
     * Create a new pivot attachment record.
     *
     * @param  int   $id
     * @param  bool  $timed
     * @return array
     */
    protected function baseAttachRecord($id, $timed)
    {
        $record[$this->relatedKey] = $id;

        $record[$this->foreignKey] = $this->getLocalForeignKey();

        // If the record needs to have creation and update timestamps, we will make
        // them by calling the parent model's "freshTimestamp" method which will
        // provide us with a fresh timestamp in this model's preferred format.
        if ($timed) {
            $record = $this->addTimestampsToAttachment($record);
        }

        return $record;
    }
    
}
