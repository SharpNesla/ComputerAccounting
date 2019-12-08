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
        return $builder->withCount('rooms');
    }

    public function getById($id)
    {
        return Subsidiary::with('director')->findOrFail($id);
    }

    public function validateEntity(array $array) : bool
    {
        return Validator::make($array,[
            'name' => 'required',
            'address' => 'required'
        ])->fails();
    }
}
