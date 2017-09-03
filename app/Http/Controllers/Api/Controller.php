<?php

namespace App\Http\Controllers\Api;

use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller as AppController;
use Qintuap\Repositories\{
    Factory as RepoFactory,
    EloquentRepository as Repository
};
use Illuminate\Support\Facades\Storage;

/**
 * @author arno
 */
class Controller extends AppController {
    
    /**
     * @var Request
     */
    var $request;
    /**
     * @var Repository
     */
    var $repo;
    /**
     * @var Repository
     */
    var $valueRepo;
    
    var $model; // model name
    
    protected $includeValues = false; // include dynamic values
    protected $with = []; // relations to load with
    protected $parents = []; //name of the user supplied relation
    protected $relationNames = []; //if user supplied relation isn't the same as actual relation name, fix is here: apiRelation => ormRelation
    protected $repoFactory;
    
    public function __construct(Request $request, RepoFactory $factory)
    {
        $this->request = $request;
        $this->repoFactory = $factory;
        if($this->model) {
            $this->repo = $factory->make($this->model);
        }
    }
    
    function index()
    {
        $collection = $this->repo->with($this->with)->all();
        if($this->includeValues) {
            $collection->each(function($model) {
                $model->values = $model->getValues();
            });
    }
        return response()->json($collection);
    }
    
    function show($id)
    {
        $model = $this->repo->with($this->with)->find($id);
        return response()->json($model);
    }
            
    function store()
    {
        $data = $this->request->all();
        $created = $this->repo->create(array_only($data, $this->only));
        
        $this->_attachParents($created, array_only($data,$this->parents));

        return response()->json($created->fresh()->toArray());
    }

    function destroy($id)
    {
        $destroyed = $this->repo->delete($id);
        return response()->json($destroyed);
    }
    
    function update($id)
    {
        $data = $this->request->all();
        $this->repo->update($id, array_only($data, $this->only));
        $this->_attachParents($id, array_only($data, $this->parents));
        $entity = $this->repo->find($id);
        return response()->json($entity);
    }
    
    function updateCollection()
    {
        $models = $this->request->all();
        $updated = [];
        foreach ($models as $model) {
            $updated[] = $model['id'];
            $this->repo->update($model['id'], array_only($model, $this->only));
            $this->_attachParents($model['id'], array_only($model, $this->parents));
        }
        $updatedCollection = $this->repo->newQuery()->whereIn('id',$updated);
        
        return response()->json($updatedCollection);
    }

    /**
     * Attach parents from input to the page
     * @param type $model
     */
    protected function _attachParents($model, $data = [])
    {
        foreach ($this->parents as $parentName) {
            
            if(!key_exists($parentName,$data)) {
                continue;
            }
            if(isset($this->relationNames[$parentName])) {
                $relationName = $this->relationNames[$parentName];
            } else {
                $relationName = Str::camel($parentName);
            }
            $this->repo->sync($model,$relationName,$data[$parentName]);
        }
        
        return $model;
    }
    
    /**
     * Syntax cleaning function.
     * @param Model|int $input
     * @return int
     */
    protected function makeId($input)
    {
        if($input instanceof Model) {
            $id = $input->getKey();
        } else {
            $id = $input;
        }
        return $id;
    }
    
    /**
     * Sync the collection with the given input. All changes in the given input will be pushed to the database.
     * if a cid attribute is given in the input for contingency, the cid attribute will be put in the models of the collection
     * TODO: recognize unique keys and use them to update instead of add when id is missing.
     * @param type $cellId
     * @return type
     */
    function _SyncCollection($collection, $input, $keeping = ['cid'])
    {
        //delete
        $toDelete = $collection->except(array_pluck($input, 'id'));
        $this->deleteFromCollection($collection,$toDelete);
        //update
        $toUpdate =  array_where($input, function($array) {
            return isset($array['id']);
        });
        $this->updateToCollection($collection,$toUpdate,$keeping);
        //add
        $toAdd =  array_where($input, function($array) {
            return !isset($array['id']);
        });
        $this->addToCollection($collection, $toAdd, $keeping);
        return $collection;
    }
    
    function deleteFromCollection($collection,$toDelete) {
        foreach ($toDelete as $model) {
            $this->repo->delete($model);
        }
        $deleteKeys = $toDelete->modelKeys();
        
        foreach ($deleteKeys as $key) {
            $itemKey = $collection->search(function($item) use ($key) {
                return $item->getKey() === $key;
            });
            if($itemKey !== false) {
                $collection->forget($itemKey);
            }
        }
    }
    
    function updateToCollection($collection,$toUpdate,$keeping = []) {
        foreach ($toUpdate as $updateData) {
            $model = $collection->find($updateData['id']);
            $this->_attachParents($model, array_only($updateData, $this->parents));
            $this->repo->update($model, array_only($updateData, $this->only));
            foreach ($keeping as $keep) {
                if(isset($updateData[$keep])) {
                    $model->$keep = $updateData[$keep];
                }
            }
        }
    }
    
    protected $defaultPivotData = [];
    function addToCollection($collection,$toAdd,$keeping = []) {
        foreach ($toAdd as $addData) {
            $created = $this->repo->create(array_only($addData, $this->only));
            
            $this->_attachParents($created, array_only($addData, $this->parents));
            foreach ($keeping as $keep) {
                if(isset($addData[$keep])) {
                    $created->$keep = $addData[$keep];
                }
            }
            $collection->add($created);
        }
    }

    function valuesIndex($id)
    {
//        $site = 
//        $valueRepo = $this->valueRepo;
//        $results = $valueRepo->getValues($site,false);
        $entity = $this->repo->find($id);
        $results = $entity->getValues();
//        return response('-')->header('Content-Type', 'text/html');
        return response($results)->header('Content-Type', 'application/json');
    }
    
    function valuesUpdate($id)
    {
        $entity = $this->repo->find($id);
        
        $data = $this->request->except(['id']);
        
        $data = array_filter($data, function($value) {
            return $value !== "";
        });
        $entity->setValues($data);
        
        return response($entity->getValues())->header('Content-Type', 'application/json');
//        return $valueRepo->getValues($site);
    }
    
    function relationIndex($relation, $relationId)
    {
        $relation = camel_case($relation);
        $models = $this->repo->ofRelation($relation, $relationId)->all();
        return response()->json($models);
}
    
    function relationUpdate($relation, $relationId)
    {
        $models = $this->repo->ofRelation($relation, $relationId)->all();
        
        $input = $this->request->all();
        $collection = $this->_SyncCollection($models, $input);
        
        return response()->json(array_values($collection->toArray()));
    }
}
