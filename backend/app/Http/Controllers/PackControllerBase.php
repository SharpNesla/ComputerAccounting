<?php


namespace App\Http\Controllers;

use App\FulltextBuilder;
use App\License;
use Illuminate\Http\Request;

class PackControllerBase extends CrudControllerBase
{
    function __construct($f, $s = ['id'])
    {
        parent::__construct($f, $s);
    }

    function addPack(Request $request){
        $decodedAsArray = json_decode($request->getContent(), true);
        if ($decodedAsArray == null){
            return response("Corrupted request body", 400);
        }
        if (!$this->validateEntity($decodedAsArray)){
            return response("Invalid entity", 400);
        }
        for ($i = 0; $i < $decodedAsArray['count']; $i++) {
            $model = $this->facade::create($decodedAsArray);
            $model->save();
        }

    }
}
