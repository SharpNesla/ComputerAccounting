<?php

namespace App\Http\Controllers;

use App\Computer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class ComputerController extends CrudControllerBase
{
    function __construct() {
        parent::__construct(Computer::class);
    }




}
