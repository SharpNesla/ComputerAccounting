<?php

namespace App\Http\Controllers;

use App\Room;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class RoomController extends CrudControllerBase
{
    function __construct()
    {
        parent::__construct(Room::class, ['id', 'number']);
    }

    protected function queryMany(Request $request, Builder $builder): Builder
    {
        return $builder->withCount('computers');
    }

    public function getById($id)
    {
        return Room::with('subsidiary')->findOrFail($id);
    }

    protected function applyFilters(array $filter, Builder $builder): Builder
    {
        if(array_key_exists('computers_count_low_bound', $filter)){
            $builder = $builder
                ->has('computers', '>=', $filter['computers_count_low_bound']);
        }

        if(array_key_exists('computers_count_high_bound', $filter)){
            $builder = $builder
                ->has('computers', '<=', $filter['computers_count_high_bound']);
        }

        if(array_key_exists('subsidiary_id', $filter)){
            $builder = $builder->where('subsidiary_id', $filter['subsidiary_id']);
        }

        return $builder;
    }


    public function validateEntity(array $array) : bool
    {
        return !Validator::make($array,[
            'number' => 'required',
        ])->fails();
    }
}
