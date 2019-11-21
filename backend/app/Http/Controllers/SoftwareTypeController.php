<?php

namespace App\Http\Controllers;

use App\SoftwareType;

class SoftwareTypeController extends CrudControllerBase
{
    function __construct() {
        parent::__construct(SoftwareType::class);
    }
}
