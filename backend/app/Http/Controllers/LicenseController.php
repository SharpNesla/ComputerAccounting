<?php

namespace App\Http\Controllers;

use App\License;
use Illuminate\Http\Request;

class LicenseController extends CrudControllerBase
{
    public function __construct()
    {
        parent::__construct(License::class);
    }
}
