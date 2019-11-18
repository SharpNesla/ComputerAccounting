<?php

namespace App\Http\Controllers;

use App\PartType;
use Illuminate\Http\Request;

class PartTypeController extends CrudControllerBase
{
    function __construct() {
        parent::__construct(PartType::class);
    }
}
