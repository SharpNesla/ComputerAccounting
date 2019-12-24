<?php

namespace App\Http\Controllers;

use App\Subsidiary;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class SubsidiaryController extends CrudControllerBase
{
    function __construct()
    {
        parent::__construct(Subsidiary::class, ['id', 'name', 'address']);
    }


    protected function queryMany(Request $request, Builder $builder): Builder
    {
        return $builder
            ->withCount('rooms')
            ->withCount('computers')
            ->withCount('employees');
    }

    protected function applyFilters(array $filter, Builder $builder): Builder
    {
        if (array_key_exists('rooms_count_low_bound', $filter)) {
            $builder = $builder
                ->has('rooms', '>=', $filter['rooms_count_low_bound']);
        }

        if (array_key_exists('rooms_count_high_bound', $filter)) {
            $builder = $builder
                ->has('rooms', '<=', $filter['rooms_count_high_bound']);
        }

        if (array_key_exists('computers_count_low_bound', $filter)) {
            $builder = $builder
                ->has('computers', '>=', $filter['computers_count_low_bound']);
        }

        if (array_key_exists('computers_count_high_bound', $filter)) {
            $builder = $builder
                ->has('computers', '<=', $filter['computers_count_high_bound']);
        }

        if (array_key_exists('employees_count_low_bound', $filter)) {
            $builder = $builder
                ->has('employees', '>=', $filter['employees_count_low_bound']);
        }

        if (array_key_exists('employees_count_high_bound', $filter)) {
            $builder = $builder
                ->has('employees', '<=', $filter['employees_count_high_bound']);
        }
        if (array_key_exists('director_id', $filter)) {
            $builder = $builder->where('director_id', $filter['director_id']);
        }

        return $builder;
    }

    public function getById($id)
    {
        return Subsidiary::with('director')
            ->with(['rooms' => function($q){
                $q->withCount('computers');
            }])
            ->withCount('rooms')
            ->withCount('computers')
            ->withCount('employees')
            ->findOrFail($id);
    }

    public function validateEntity(array $array): bool
    {
        return !Validator::make($array, [
            'name' => 'required',
            'address' => 'required'
        ])->fails();
    }
}
