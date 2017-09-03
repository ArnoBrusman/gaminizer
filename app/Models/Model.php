<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model as EloquentModel;
use Qintuap\Repositories\EloquentRepository;
use Qintuap\Repositories\Traits\HasRepo;
use Qintuap\Scopes\Traits\HasRelationScopes;
use Qintuap\CacheDecorators\Contracts\CacheableScopes;
use App\Collections\Collection;
use Qintuap\Repositories\Query\BaseCacheBuilder as QueryBuilder;
use App\Relations\HasOneThrough;
use App\Relations\BelongsThrough;
use Sofa\Eloquence\Eloquence;
use Sofa\Eloquence\Mappable;
use Qintuap\Repositories\Query\Builder;

/**
 * @property EloquentRepository $repo
 */
class Model extends EloquentModel implements CacheableScopes
{
    use HasRepo, HasRelationScopes, Eloquence;
    public $timestamps = false; // don't try to insert timestamps by default
    protected $guarded = ['id'];

    /**
     * Use database of a specific connection
     */
//    protected $connection = 'advanza';
    protected $connection_database = 'advanza';
    protected $database;
    protected $hidden = ['repository'];


    /**
     * Validation rules for this model.
     * @var array
     */
    protected $rules = array();

    public function __construct(array $attributes = array())
    {
        if($this->connection_database) {
            $this->database = $this->getConnectionDatabase($this->connection_database);
        } else {
            $this->database = $this->getDefaultDatabase();
        }
        $this->setTablePrefix();
//        $this->repoable = get_class($this);
        parent::__construct($attributes);
    }
    
    protected function getDefaultDatabase()
    {
        return $this->getConnectionDatabase(config('database.default'));
    }
    
    protected function getConnectionDatabase($connection)
    {
        return config('database.connections.'.$connection.'.database');
    }
    
    protected function prefixTable($table)
    {
        if($this->database && !preg_match('~^[^\.]*\.~', $table)) {
            $table = $this->database . '.' . $table;
        }
        return $table;
    }
    
    // Set table prefix to make sure the correct database will be selected
    protected function setTablePrefix()
    {
        $this->setTable($this->prefixTable($this->getTable()));
    }
    
    protected function getTableWithoutPrefix()
    {
        return preg_replace('~^[^\.]*\.~', '', $this->getTable());
    }
    
    function getRelationClass($relationName)
    {
        return get_class($this->$relationName()->getRelated());
    }
    
    /**
     * 
     * @param type $name
     * @return Collection|Model
     */
    public function fetchRelation($name, \Closure $callback = null)
    {
        if ($this->relationLoaded($name) && is_null($callback)) {
            return $this->relations[$name];
        }
        $relation = $this->repo->getRelation($this, $name, $callback);
        if(is_null($callback)) {
            $this->setRelation($name, $relation);
        }
        return $relation;
    }
    
    /**
     * Create a new Eloquent Collection instance.
     *
     * @param  array  $models
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public function newCollection(array $models = [])
    {
        return new Collection($models, get_class($this));
    }
    
    public function hasOneThrough($related, $through, $firstKey = null, $secondKey = null, $localKey = null)
    {
        $through = new $through;

        $firstKey = $firstKey ?: $this->getForeignKey();

        $secondKey = $secondKey ?: $through->getForeignKey();

        $localKey = $localKey ?: $this->getKeyName();

        return new HasOneThrough((new $related)->newQuery(), $this, $through, $firstKey, $secondKey, $localKey);
    }
    
    function getFilePath($path = '')
    {
        return $this->repo->getFilePath($this->getKey() . '/' . $path);
    }
    
    function getFileHref($path = '')
    {
        return $this->repo->getFileHref($this->getKey() . '/' . $path);
    }
    
    static public function multiInsert(array $attributeMap)
    {
        $collection = new Collection;
        foreach ($attributeMap as $attributes) {
            $collection->add(self::create($attributes));
        }
        return $collection;
    }
    
    function __get($key)
    {
        if($key === 'repo') return $this->getRepository();
        
        if ($key && !(array_key_exists($key, $this->attributes) || $this->hasGetMutator($key))
                && !method_exists(parent::class, $key) && method_exists($this, $key)) {
            return $this->fetchRelation($key);
        }
        return parent::__get($key);
    }

    /**
     * Fetch model table columns.
     *
     * @return void
     */
    protected static function loadColumnListing()
    {
        if (empty(static::$columnListing)) {
            $instance = new static;

            $table = $instance->getTableWithoutPrefix();
            static::$columnListing = $instance->getConnection()
                                        ->getSchemaBuilder()
                                        ->getColumnListing($table);
//            static::$columnListing = $instance->getConnection()
//                                        ->getSchemaBuilder()
//                                        ->getColumnListing($table);
        }
    }

    /* ----------------------------------------------------- *\
     * Relation methods
     * ----------------------------------------------------- */
    
//    protected function 
    
    public function morphedByMany($related, $name, $table = null, $foreignKey = null, $relatedKey = null)
    {
        if($table) $table = $this->prefixTable($table);
        return parent::morphedByMany($related, $name, $table, $foreignKey, $relatedKey);
    }
    
    public function belongsToMany($related, $table = null, $foreignKey = null, $relatedKey = null, $relation = null)
    {
        if($table) $table = $this->prefixTable($table);
        return parent::belongsToMany($related, $table, $foreignKey, $relatedKey,
                $relation);
    }
    
    public function morphToMany($related, $name, $table = null, $foreignKey = null, $relatedKey = null, $inverse = false)
    {
        if($table) $table = $this->prefixTable($table);
        return parent::morphToMany($related, $name, $table, $foreignKey, $relatedKey,
                $inverse);
    }
    
    /**
     * Define a 'belongs to' relation, but through a mediating table. 
     * Hack from belongsToMany
     * @param type $related
     * @param type $table
     * @param type $foreignKey
     * @param type $relatedKey
     * @param type $relation
     * @return type
     */
    public function belongsThrough($related, $table = null, $foreignKey = null, $relatedKey = null, $localKey = null, $relation = null)
    {
        if($table) $table = $this->prefixTable($table);
        // If no relationship name was passed, we will pull backtraces to get the
        // name of the calling function. We will use that function name as the
        // title of this relation since that is a great convention to apply.
        if (is_null($relation)) {
            $relation = $this->guessBelongsToManyRelation();
        }

        // First, we'll need to determine the foreign key and "other key" for the
        // relationship. Once we have determined the keys we'll make the query
        // instances as well as the relationship instances we need for this.
        $instance = $this->newRelatedInstance($related);
        
        $foreignKey = $foreignKey ?: $this->getForeignKey();

        $relatedKey = $relatedKey ?: $instance->getForeignKey();
        
        $localKey = $localKey ?: $instance->getForeignKey();

        // If no table name was provided, we can guess it by concatenating the two
        // models using underscores in alphabetical order. The two model names
        // are transformed to snake case from their default CamelCase also.
        if (is_null($table)) {
            $table = $this->joiningTable($related);
        }
        
        return new BelongsThrough(
            $instance->newQuery(), $this, $table, $foreignKey, $relatedKey, $localKey, $relation
        );
    }
    
    /* ===================================================== *\
     * Utility functions
     * ===================================================== */
    
    /**
     * Syntax cleaning function.
     * @param Model|int $model
     * @return int
     */
    protected function _makeKey($model)
    {
        if($model instanceof EloquentModel) {
            $key = $model->getKey();
        } else {
            $key = $model;
        }
        return $key;
    }
    
    public function newEloquentBuilder($query)
    {
        return new Builder($query);
    }
    /**
     * Get a new query builder instance for the connection.
     *
     * @return \Illuminate\Database\Query\Builder
     */
    protected function newBaseQueryBuilder()
    {
        $conn = $this->getConnection();

        $grammar = $conn->getQueryGrammar();

        return new QueryBuilder($conn, $grammar, $conn->getPostProcessor());
    }

    /**
     * Register hook on Eloquent method.
     *
     * @param  string   $method
     * @param  \Closure $hook
     * @return void
     */
    public static function hook($method, \Closure $hook)
    {
        $class = get_called_class();
        static::$hooks[$class][$method][] = $hook;
    }
    
    /**
     * Get all hooks for given method bound to $this instance.
     *
     * @param  string $method
     * @return \Closure[]
     */
    protected function boundHooks($method)
    {
        $class = get_called_class();
        $hooks = isset(static::$hooks[$class][$method]) ? static::$hooks[$class][$method] : [];

        return array_map(function ($hook) {
            return $hook->bindTo($this, get_class($this));
        }, $hooks);
    }
    
    /**
     * Get the database connection for the model.
     *
     * @return \Illuminate\Database\Connection
     */
    public function getConnection()
    {
        $connection = static::resolveConnection($this->getConnectionName());
        $connection->setDatabaseName($this->database);
        return $connection;
    }
    
    /* ----------------------------------------------------- *\
     * Serialize
     * ----------------------------------------------------- */
    
    public function __sleep()
    {
        //Serializing relations can result to relations of relations of relations etc.
        return array_keys(array_except(get_object_vars($this),'relations'));
    }
}