<?php

namespace App\Http\Controllers;

use App\License;
use App\Part;
use App\PartType;
use App\Room;
use App\Subsidiary;
use Illuminate\Database\Eloquent\Builder;
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

    protected function queryMany(Request $request, Builder $builder): Builder
    {
        $currentRole = $request->user()->role;

        if($currentRole == 1 || $currentRole == 3){
            $builder = $builder->where('subsidiary_id', $request->user()->subsidiary_id);
        }

        return $builder->with('partType');
    }

    protected function applyFilters(array $filter, Builder $builder): Builder
    {
        if (array_key_exists('subsidiary_id', $filter)) {
            $builder = $builder->where('subsidiary_id', $filter['subsidiary_id']);
        }
        if (array_key_exists('computer_id', $filter)) {
            $builder = $builder->where('computer_id', $filter['computer_id']);
        }
        if (array_key_exists('part_type_id', $filter)) {
            $builder = $builder->where('part_type_id', $filter['part_type_id']);
        }

        return $builder;
    }

    public function getSubtotals(Request $request)
    {
        $query = Part::query();
        $filter = json_decode($request->filter, true);
        if ($filter != null && $this->validateFilters($filter)) {
            $query = $this->applyFilters($filter, $query);
        }
        return [
            'count' => $query->count(),
            'cost' => $query->with('partType')
                ->selectRaw('SUM(cost) as sum_cost')->get()[0]['sum_cost'],
        ];
    }

    /**
     * Function returns date-part count pairs.
     * @param Request $request
     * @return array
     */
    public function getCountByDate(Request $request)
    {
        $query = Part::query();

        $dateSlice = $request->input('date_slice');
        error_log($dateSlice);
        switch ($dateSlice) {
            case 0:
                $query = $query
                    ->selectRaw("count(*) as count, date_trunc('day', updated_at) AS date");
                break;
            case 1:
                $query = $query
                    ->selectRaw("count(*) as count,  date_trunc('week', updated_at) AS date");
                break;
            case 2:
                $query = $query
                    ->selectRaw("count(*) as count, date_trunc('month', updated_at) AS date");
                break;
            case 3:
                $query = $query
                    ->selectRaw("count(*) as count, date_trunc('year', updated_at) AS date");
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

    public function getCountByType(Request $request)
    {
        return PartType::query()->withCount(['parts' => function ($q) {
            $q->where('state', 2);
        }])->get();
    }

    public function getCountBySubsidiary(Request $request)
    {
        return Subsidiary::query()->withCount(['parts' => function ($q) {
            $q->where('state', 1);
        }])->get();
    }
}
