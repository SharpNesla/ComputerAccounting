<?php

namespace App\Http\Controllers;

use App\License;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
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
        return $builder
            ->select()
            ->addSelect(DB::raw('(expired_at < now()) as expired '))
            ->withCount('software');
    }

    public function getApplicable(Request $request)
    {
        $query = $this->queryMany($request, License::orderBy('id'))
            ->where('software_type_id', $request->for)
            ->whereRaw('(select count(*) from "software"
                             where "licenses"."id" = "software"."license_id"
                             and "software"."deleted_at" is null) < max_apply_count')
            ->where('expired_at', '>', Carbon::now());


        $filter = json_decode($request->filter, true);

        if ($filter != null && $this->validateFilters($filter)) {
            $query = $this->applyFilters($filter, $query);
        }

        return $query
            ->skip($request->offset)
            ->take($request->limit)->get();
    }

    public function validateEntity(array $array): bool
    {
        return !Validator::make($array, [
            'cost' => 'required',
            'max_apply_count' => 'required',

            'eula' => 'required',
            'software_type_id' => 'required|exists:software_types,id',

            'purchased_at' => 'required',
            'expired_at' => 'required'
        ])->fails();
    }
}
