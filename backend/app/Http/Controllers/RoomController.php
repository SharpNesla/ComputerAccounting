<?php

namespace App\Http\Controllers;

use App\Room;
use Illuminate\Http\Request;

class RoomController extends CrudControllerBase
{
    function __construct() {
        parent::__construct(Room::class);
    }
}
