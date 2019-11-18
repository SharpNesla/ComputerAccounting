<?php


namespace App\Http\Controllers;


use App\Computer;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;

class CrudControllerBase extends Controller
{
    private $facade;

    function __construct($f)
    {
        $this->facade = $f;
    }


    public function getById($id)
    {
        return $this->facade::find($id);
    }

    protected function queryFilters(Request $request, Builder $query): Builder
    {

        return $query;
    }

    protected function queryRelations(Request $request, Builder $query): Builder
    {
        return $query;
    }

    public function get(Request $request)
    {
        return $this->facade::orderBy('id')->skip($request->offset)
            ->take($request->limit)->get();
    }


    public function getCount()
    {
        return $this->facade::count();
    }

    public function update(Request $request)
    {
        $decodedAsArray = json_decode($request->getContent(), true);
        $model = $this->facade::find($decodedAsArray['id']);
        $model->forcefill($decodedAsArray);
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
