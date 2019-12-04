<?php


namespace App\Http\Controllers;


use App\Computer;
use App\FulltextBuilder;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;

class CrudControllerBase extends Controller
{
    private $facade;
    private $fulltextBuilder;
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

    protected function querySave(Array $object, Model $model): Model
    {
        return $model;
    }

    public function get(Request $request)
    {
        $query = $this->queryMany($request, $this->facade::orderBy('id'));

        if ($request->searchstring != null) {
            $query = $query->where($this->fulltextBuilder->search($request->searchstring));
        }

        return $query
            ->skip($request->offset)
            ->take($request->limit)->get();
    }


    public function getCount(Request $request)
    {
        return $this->facade::count();
    }

    public function update(Request $request)
    {
        $decodedAsArray = json_decode($request->getContent(), true);
        $model = $this->facade::find($decodedAsArray['id']);
        $model->fill($decodedAsArray);
        $model = $this->querySave($decodedAsArray ,$model);
        $model->save();

    }

    public function add(Request $request)
    {
        $decodedAsArray = json_decode($request->getContent(), true);
        $model = $this->facade::forceCreate($decodedAsArray);
        $model->save();
    }

    public function remove($id)
    {
        $model = $this->facade::destroy($id);
    }
}
