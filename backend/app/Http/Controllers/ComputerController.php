<?php

namespace App\Http\Controllers;

use App\Computer;

class ComputerController extends CrudControllerBase
{
    function __construct()
    {
        parent::__construct(Computer::class);
    }


    public function getById($id)
    {
        return Computer::with('room')
            ->with('responsible')
            ->findOrFail($id);
    }
}
