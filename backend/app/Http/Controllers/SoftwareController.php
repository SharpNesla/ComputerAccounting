<?php

namespace App\Http\Controllers;

use App\Software;

class SoftwareController extends CrudControllerBase
{
    function __construct() {
        parent::__construct(Software::class);
    }

    public function getById($id)
    {
        return Software::with('softwareType')
            ->with('computer')
            ->findOrFail($id);
    }
}
