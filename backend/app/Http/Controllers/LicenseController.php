<?php

namespace App\Http\Controllers;

use App\License;
use App\Room;
use Illuminate\Http\Request;

class LicenseController extends CrudControllerBase
{
    public function __construct()
    {
        parent::__construct(License::class);
    }

    public function getById($id)
    {
        return License::with('softwareType')
//            ->withCount('software')
            ->findOrFail($id);
    }
}
