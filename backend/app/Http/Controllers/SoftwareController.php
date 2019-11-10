<?php

namespace App\Http\Controllers;

use App\Software;

class SoftwareController extends Controller
{
    function __construct() {
        parent::__construct(Software::class);
    }
}
