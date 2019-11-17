<?php

namespace App\Http\Controllers;

use App\Computer;

class ComputerController extends CrudControllerBase
{
    function __construct() {
        parent::__construct(Computer::class);
    }

}
