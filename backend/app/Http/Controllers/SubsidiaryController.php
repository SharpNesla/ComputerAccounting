<?php

namespace App\Http\Controllers;

use App\Subsidiary;

class SubsidiaryController extends CrudControllerBase
{
    function __construct() {
        parent::__construct(Subsidiary::class);
    }
}
