<?php

namespace App\Http\Controllers;

use App\Part;
use App\PartType;
use App\Room;
use Illuminate\Http\Request;

class PartController extends PackControllerBase
{
    function __construct()
    {
        parent::__construct(Part::class);
    }

    public function getById($id)
    {
        return Part::with('partType')
            ->with('subsidiary')
            ->with('computer')
            ->findOrFail($id);
    }

    public function getCountBySubsidiaries(Request $request){
        return Part::query()->selectRaw('count(*) as count, parts.state')
            ->groupBy('state')->get();
    }
}
