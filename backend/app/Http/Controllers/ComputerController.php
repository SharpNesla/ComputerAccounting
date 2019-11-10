<?php

namespace App\Http\Controllers;

use App\Computer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class ComputerController extends Controller
{
    public function get(Request $request)
    {
        return Computer::all();
    }
    public function update(){

    }

    public function add(Request $request){
        $decodedAsArray = json_decode($request->getContent(), true);
        $model = Computer::forceCreate($decodedAsArray);
        $model->save();
    }

    public function delete(){

    }
}
