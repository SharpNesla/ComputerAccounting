<?php

namespace App\Http\Controllers;

use App\Room;
use Illuminate\Database\Eloquent\Model;

class RoomController extends CrudControllerBase
{
    function __construct()
    {
        parent::__construct(Room::class);
    }
    public function getById($id)
    {
        return Room::with('subsidiary')->find($id);
    }
}
