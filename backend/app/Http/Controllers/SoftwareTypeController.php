<?php

namespace App\Http\Controllers;

use App\SoftwareType;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;

class SoftwareTypeController extends CrudControllerBase
{
    function __construct()
    {
        parent::__construct(SoftwareType::class, ['id', 'typename']);
    }

    public function getById($id)
    {
        return SoftwareType::with('dependencies')
            ->findOrFail($id);
    }

    protected function queryMany(Request $request, Builder $builder): Builder
    {
        return $builder->withCount('software');
    }

    protected function querySave(array $object, Model $model): Model
    {
        if (array_key_exists('dependencies_ids' ,$object)){
            $model->dependencies()->sync($object['dependencies_ids']);
        }
        return parent::querySave($object, $model);
    }

    protected function applyFilters(array $filter, Builder $builder): Builder
    {
        if (array_key_exists('software_count_low_bound', $filter)) {
            $builder = $builder
                ->has('rooms', '>=', $filter['software_count_low_bound']);
        }

        if (array_key_exists('software_count_high_bound', $filter)) {
            $builder = $builder
                ->has('rooms', '<=', $filter['software_count_high_bound']);
        }

        if (array_key_exists('category', $filter)) {
            $builder = $builder->where('category', $filter['category']);
        }

        return $builder;
    }

}
