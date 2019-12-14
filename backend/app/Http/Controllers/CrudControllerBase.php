<?php


namespace App\Http\Controllers;

use App\FulltextBuilder;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;

class CrudControllerBase extends Controller
{
    protected $facade;
    protected $fulltextBuilder;
    function __construct($f, $s = ['id'])
    {
        $this->facade = $f;
        $this->fulltextBuilder = new FulltextBuilder($s);
    }


    public function getById($id)
    {
        return $this->facade::findOrFail($id);
    }

    protected function queryMany(Request $request, Builder $builder): Builder
    {
        return $builder;
    }

    protected function applyFilters(array $filter, Builder $builder): Builder
    {
        return $builder;
    }

    protected function querySave(Array $object, Model $model): Model
    {
        return $model;
    }

    public function get(Request $request)
    {
        $query = $this->queryMany($request, $this->facade::orderBy('id'));

        $filter = json_decode($request->filter, true);

        if ($filter != null && $this->validateFilters($filter)) {
            $query = $this->applyFilters($filter, $query);
        }

        if ($request->search != null && $request->search != '') {
            $query = $query->where($this->fulltextBuilder->search($request->search));
        }

        return $query
            ->skip($request->offset)
            ->take($request->limit)->get();
    }

    public function getCount(Request $request)
    {
        return $this->facade::count();
    }

    protected function validateEntity(array $array) : bool {
        return false;
    }

    protected function validateFilters(array $filterA) : bool {
        return true;
    }

    public function update(Request $request)
    {
        $decodedAsArray = json_decode($request->getContent(), true);
        if ($decodedAsArray == null){
            return response("Corrupted request body", 400);
        }
        $model = $this->facade::find($decodedAsArray['id']);
        $model->fill($decodedAsArray);
        $model = $this->querySave($decodedAsArray ,$model);
        $model->save();

    }

    public function add(Request $request)
    {
        $decodedAsArray = json_decode($request->getContent(), true);
        if ($decodedAsArray == null){
            return response("Corrupted request body", 400);
        }
        if ($this->validateEntity($decodedAsArray)){
            return response("Invalid entity", 400);
        }

        $model = $this->facade::create($decodedAsArray);
        $model->save();
    }

    public function remove($id)
    {
        $model = $this->facade::destroy($id);
    }
}
