<?php

namespace App\Http\Controllers;

use App\Room;
use App\SoftwareType;
use Illuminate\Http\Request;

class SoftwareTypeController extends Controller
{
    function __construct() {
        parent::__construct(SoftwareType::class);
    }
}
