<?php

namespace App\Http\Controllers;

use App\Computer;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;

class ComputerController extends CrudControllerBase
{
    function __construct()
    {
        parent::__construct(Computer::class, ['id', 'inventory_id', 'name']);
    }


    public function getById($id)
    {
        return Computer::with('room')
            ->with('responsible')
            ->with('users')
            ->findOrFail($id);
    }

    protected function querySave(array $object, Model $model): Model
    {
        $model->users()->sync($object['user_ids']);

        return parent::querySave($object, $model);
    }

    function getDependencySatisfying(Request $request){
        $query = $this->queryMany($request, Computer::orderBy('id'));
        $softwareTypeId = $request->software_type_id;

        $query = $query;

        if ($request->searchstring != null) {
            $query = $query->where($this->fulltextBuilder->search($request->searchstring));
        }

        return $query
            ->skip($request->offset)
            ->take($request->limit)->get();
    }
}
