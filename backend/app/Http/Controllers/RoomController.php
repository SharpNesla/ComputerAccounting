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

    public function validateEntity(array $array) : bool
    {
        return !Validator::make($array,[
            'number' => 'required',
        ])->fails();
    }
}
