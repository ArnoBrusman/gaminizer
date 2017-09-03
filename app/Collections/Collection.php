<?php

namespace App\Collections;

use Illuminate\Database\Eloquent\Collection as BaseCollection;
use Illuminate\Database\Eloquent\Model as EloquentModel;

/**
 * Collection looks if the model has a callable filter.
 * @author arno
 */
class Collection extends BaseCollection {
    
    protected $model;

    public function __construct($items = array(), $model = null)
    {
        parent::__construct($items);
        if(!is_null($model)) $this->setModel($model);
    }
    
    public function setModel($class)
    {
        $this->model = new $class;
        return $this;
    }
    
    public function __call($method, $parameters)
    {
        if($this->model !== null) {
            $filter = 'filter' . ucfirst($method);
            if(!method_exists($this->model, $filter)) {
                $filter = 'scope' . ucfirst($method);
            }
            if(method_exists($this->model, $filter)) {
                array_unshift($parameters, $this);
                return call_user_func_array([$this->model,$filter], $parameters);
            }
        }
        
        return parent::__call($method, $parameters);
    }
    
    
    public function ofRelation($relationName, $relation)
    {
        if($relation instanceof EloquentModel) {
            $id = $relation->getKey();
        } else {
            $id = $relation;
        }
        
        $relationQuery = $this->model->$relationName();
        
        if($relationQuery instanceof BelongsTo) {
            $foreignKey = $relationQuery->getForeignKey();
            return $this->where($foreignKey, $id);
        } else {
            $key = $relationQuery->getRelated()->getKeyName();
            return $this->where($relationName.'.'.$key,$id);
        }
    }
    
    public function filter(callable $callback = null)
    {
        $collection = parent::filter($callback);
        return $collection->setModel(get_class($this->model));
    }
    
    /**
     * Make a collection of collection, the key being the value of the given keyname.
     * @param string $keyName
     */
    public function categorizeBy($column)
    {
        $categories = new self;
        $this->each(function($item) use (&$categories,$column) {
            if(!isset($categories[$item->$column])) $categories[$item->$column] = new self;
            $categories[$item->$column]->add($item);
        });
        return $categories;
    }
    
}
