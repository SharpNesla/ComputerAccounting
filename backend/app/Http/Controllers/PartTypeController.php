<?php

namespace App\Http\Controllers;

use App\PartType;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;

class PartTypeController extends CrudControllerBase
{
    function __construct() {
        parent::__construct(PartType::class);
    }

    protected function queryMany(Request $request, Builder $builder): Builder
    {
        return $builder->withCount('parts');
    }
}
