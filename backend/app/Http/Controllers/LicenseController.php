<?php

namespace App\Http\Controllers;

use App\License;
use App\Room;
use App\Software;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;


class LicenseController extends PackControllerBase
{
    public function __construct()
    {
        parent::__construct(License::class);
    }

    public function getById($id)
    {
        return License::with('softwareType')
            ->findOrFail($id);
    }

    protected function queryMany(Request $request, Builder $builder): Builder
    {
        return $builder->withCount('software');
    }

    public function getAvailable(Request $request)
    {
        //TODO Refactor this to Eloquent calls
        $query = $this->queryMany($request, License::orderBy('id'))
            ->whereRaw('(select count(*) from "software"
                             where "licenses"."id" = "software"."license_id"
                             and "software"."deleted_at" is null) < max_apply_count');



        $filter = json_decode($request->filter, true);

        if ($filter != null && $this->validateFilters($filter)) {
            $query = $this->applyFilters($filter, $query);
        }

        return $query
            ->skip($request->offset)
            ->take($request->limit)->get();
    }

    /*public function validateEntity(array $array) : bool
    {
        return Validator::make($array,[
            'cost' => 'required',
            'max_apply_count' => 'required',
            'is_end_on_date' => 'required',

            'expiration_date' => 'required'
        ])->fails();
    }*/
}
