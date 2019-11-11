<?php


namespace App\Http\Controllers;


use App\Computer;
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

    public function get(Request $request)
    {
        return $this->facade::skip($request->offset)
            ->take($request->limit)
            ->get();
    }


    public function getCount()
    {
        return $this->facade::count();
    }

    public function update(Request $request)
    {
        $decodedAsArray = json_decode($request->getContent(), true);
        $model = $this->facade::forceCreate($decodedAsArray);
        $model->save();
    }

    public function add(Request $request)
    {
        $decodedAsArray = json_decode($request->getContent(), true);
        $model = $this->facade::forceCreate($decodedAsArray);
        $model->save();
    }

    public function delete()
    {
    }
}
