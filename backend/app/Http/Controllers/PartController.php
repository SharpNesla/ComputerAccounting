<?php

namespace App\Http\Controllers;

use App\Part;
use App\PartType;
use App\Room;
use Illuminate\Http\Request;

class PartController extends CrudControllerBase
{
    function __construct()
    {
        parent::__construct(Part::class);
    }

    public function getById($id)
    {
        return Part::with('part_type')
            ->with('subsidiary')
            ->with('computer')
            ->findOrFail($id);
    }
}
