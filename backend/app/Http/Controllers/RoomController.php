<?php

namespace App\Http\Controllers;

use App\Room;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Validator;

class RoomController extends CrudControllerBase
{
    function __construct()
    {
        parent::__construct(Room::class, ['id', 'number']);
    }



    public function getById($id)
    {
        return Room::with('subsidiary')->findOrFail($id);
    }

    public function validateEntity(array $array) : bool
    {
        return Validator::make($array,[
            'number' => 'required',
        ])->fails();
    }
}
