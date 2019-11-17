<?php

namespace App\Http\Controllers;

use App\Room;
use http\QueryString;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;

class RoomController extends CrudControllerBase
{
    function __construct() {
        parent::__construct(Room::class);
    }

    protected function queryRelations(Request $request, Builder $query): Builder
    {
        return parent::queryRelations($request, $query)
            ->with('subsidiary');
    }
}
