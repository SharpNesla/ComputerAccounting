<?php

namespace App\Http\Controllers;

use App\Part;
use Illuminate\Http\Request;

class PartController extends CrudControllerBase
{
    function __construct() {
        parent::__construct(Part::class);
    }
}
