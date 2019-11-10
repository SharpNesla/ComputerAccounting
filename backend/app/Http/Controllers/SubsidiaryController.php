<?php

namespace App\Http\Controllers;

use App\Subsidiary;
use Illuminate\Http\Request;

class SubsidiaryController extends CrudControllerBase
{
    function __construct() {
        parent::__construct(Subsidiary::class);
    }
}
