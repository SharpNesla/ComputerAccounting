<?php

namespace App\Http\Controllers;

use App\Computer;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

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

    protected function queryMany(Request $request, Builder $builder): Builder
    {
        return $builder->withCount('users');
    }

    protected function applyFilters(array $filter, Builder $builder): Builder
    {
        if(array_key_exists('users_count_low_bound', $filter)){
            $builder = $builder
                ->has('users', '>=', $filter['users_count_low_bound']);
        }

        if(array_key_exists('users_count_high_bound', $filter)){
            $builder = $builder
                ->has('users', '<=', $filter['users_count_high_bound']);
        }

        if(array_key_exists('type', $filter)){
            $builder = $builder->where('type', $filter['type']);
        }

        return $builder;
    }

    protected function querySave(array $object, Model $model): Model
    {
        if (array_key_exists('user_ids' ,$object)){
            $model->users()->sync($object['user_ids']);
        }

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

    public function validateEntity(array $array) : bool
    {
        return Validator::make($array,[
            'name' => 'required',
            'inventory_id' => 'required',
/*
            'subsidiary_id' => 'required',*/

            'responsible_id' => 'required',

            'type' => 'required|numeric|min:0|max:11'
        ])->fails();
    }
}
