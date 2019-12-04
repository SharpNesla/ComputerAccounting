<?php

namespace App\Http\Controllers;

use App\FulltextBuilder;
use App\Room;
use App\Subsidiary;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;

class SubsidiaryController extends CrudControllerBase
{
    function __construct() {
        parent::__construct(Subsidiary::class);
    }



    protected function queryMany(Request $request, Builder $builder): Builder
    {
        $fulltext = new FulltextBuilder(['name', 'address']);

        return $builder->withCount('rooms')->where($fulltext->search('ром'));
    }

    public function getById($id)
    {
        return Subsidiary::with('director')->findOrFail($id);
    }
}
