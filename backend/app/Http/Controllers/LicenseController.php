<?php

namespace App\Http\Controllers;

use App\License;
use App\Part;
use App\PartType;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use phpDocumentor\Reflection\Types\Boolean;

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
            ->addSelect(DB::raw('(expired_at < now()) as expired'))
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

    protected function applyFilters(array $filter, Builder $builder): Builder
    {
        if (array_key_exists('cost_low_bound', $filter)) {
            $builder = $builder
                ->where('cost', '>=', $filter['cost_low_bound']);
        }


        if (array_key_exists('cost_high_bound', $filter)) {
            $builder = $builder
                ->where('cost', '<=', $filter['cost_high_bound']);
        }


        if (array_key_exists('purchased_at_low_bound', $filter)) {
            $builder = $builder
                ->where('purchased_at', '>=', $filter['purchased_at_low_bound']);
        }

        if (array_key_exists('purchased_at_high_bound', $filter)) {
            $builder = $builder
                ->where('purchased_at', '<=', $filter['purchased_at_high_bound']);
        }

        if (array_key_exists('expired_at_low_bound', $filter)) {
            $builder = $builder
                ->where('expired_at', '>=', $filter['expired_at_low_bound']);
        }

        if (array_key_exists('expired_at_high_bound', $filter)) {
            $builder = $builder
                ->where('expired_at', '<=', $filter['expired_at_high_bound']);
        }


        if (array_key_exists('software_type_id', $filter)) {
            $builder = $builder->where('software_type_id', $filter['software_type_id']);
        }

        if (array_key_exists('expired', $filter)) {
            if ($filter['expired']){
                $builder = $builder
                    ->where('expired_at', '<=', Carbon::now());

            }else{
                $builder = $builder
                    ->where('expired_at', '>', Carbon::now());
            }
        }


        return $builder;
    }

    public function getCountByDate(Request $request)
    {
        $query = License::query();
        $dateSlice = $request->input('date_slice');

        switch ($dateSlice) {
            case 0:
                $query = $query
                    ->selectRaw("count(*) as count, SUM(cost) as sum_cost,
                     date_trunc('day', purchased_at) AS date");
                break;
            case 1:
                $query = $query
                    ->selectRaw("count(*) as count, SUM(cost) as sum_cost,
                     date_trunc('week', purchased_at) AS date");
                break;
            case 2:
                $query = $query
                    ->selectRaw("count(*) as count, SUM(cost) as sum_cost, 
                    date_trunc('month', purchased_at) AS date");
                break;
            case 3:
                $query = $query
                    ->selectRaw("count(*) as count, SUM(cost) as sum_cost,
                     date_trunc('year', purchased_at) AS date");
                break;
        }

        $array = $query->groupBy('date')
            ->get()
            ->toArray();

        $tmp_arr = [];

        foreach ($array as $key => $item) {
            $date = $item['date'];
            $tmp_arr[$date][$key] = $item;
            $tmp_arr[$date] = array_values($tmp_arr[$date]);
        }
        foreach ($tmp_arr as $key => $item) {
            foreach ($item as $slice_key => $slice_item) {
                unset($tmp_arr[$key][$slice_key]['date']);
            }
        }
        return $tmp_arr;
    }
}
