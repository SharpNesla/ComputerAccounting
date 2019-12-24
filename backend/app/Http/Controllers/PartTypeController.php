<?php

namespace App\Http\Controllers;

use App\PartType;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class PartTypeController extends CrudControllerBase
{
    function __construct()
    {
        parent::__construct(PartType::class);
    }

    public function getById($id)
    {
        return PartType::query()
            ->with(['parts'=>function($q){
                $q->with('partType');
            }])
            ->with('driver')->findOrFail($id);
    }

    protected function queryMany(Request $request, Builder $builder): Builder
    {
        return $builder->withCount('parts');
    }

    public function validateEntity(array $array): bool
    {
        return !Validator::make($array, [
            'model' => 'required',
            'cost' => 'required|numeric|min:0',
            'category' => 'required|numeric|min:0|max:11'
        ])->fails();
    }
}
