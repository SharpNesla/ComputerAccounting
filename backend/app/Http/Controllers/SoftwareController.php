<?php

namespace App\Http\Controllers;

use App\Software;

class SoftwareController extends CrudControllerBase
{
    function __construct() {
        parent::__construct(Software::class);
    }
}
