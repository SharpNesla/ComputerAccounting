<?php

namespace App\Http\Controllers;

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

    public function getCountByDate(Request $request)
    {
        $query = Part::query()
            ->with('partType');
        $dateSlice = $request->input('date_slice');

        switch ($dateSlice) {
            case 0:
                $query = $query
                    ->selectRaw("count(*) as count, state, date_trunc('day', updated_at) AS date");
                break;
            case 1:
                $query = $query
                    ->selectRaw("count(*) as count, state, date_trunc('week', updated_at) AS date");
                break;
            case 2:
                $query = $query
                    ->selectRaw("count(*) as count, state, date_trunc('month', updated_at) AS date");
                break;
            case 3:
                $query = $query
                    ->selectRaw("count(*) as count, state, date_trunc('year', updated_at) AS date");
                break;
        }

        $array = $query->groupBy('state', 'date')
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
        }]);
    }

    public function getCountBySubsidiary(Request $request)
    {
        return Subsidiary::query()->withCount(['parts' => function ($q) {
            $q->where('state', 1);
        }]);
    }
}
