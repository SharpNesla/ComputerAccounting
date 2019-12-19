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

    public function getCountByDates(Request $request){
        $array = Part::query()
            ->selectRaw("count(*) as count, state, date_trunc('day', updated_at) AS date")
            ->groupBy('state', 'date')->get()->toArray();

        $tmp_arr = [];

        foreach ($array as $key => $item) {
            $date = $item['date'];
            $tmp_arr[$date][$key] = $item;
            $tmp_arr[$date] = array_values($tmp_arr[$date]);
        }
        foreach ($tmp_arr as $key => $item){
            foreach ($item as $slice_key => $slice_item){
                unset($tmp_arr[$key][$slice_key]['date']);
            }
        }
        return $tmp_arr;
    }

    public function getCountByType(Request $request){
        $array = Part::query()
            ->with('partType')
            ->selectRaw("count(*) as count, state, date_trunc('day', updated_at) AS date")
            ->groupBy('state', 'date')->get()->toArray();

        $tmp_arr = [];

        foreach ($array as $key => $item) {
            $date = $item['date'];
            $tmp_arr[$date][$key] = $item;
            $tmp_arr[$date] = array_values($tmp_arr[$date]);
        }
        foreach ($tmp_arr as $key => $item){
            foreach ($item as $slice_key => $slice_item){
                unset($tmp_arr[$key][$slice_key]['date']);
            }
        }
        return $tmp_arr;
    }
}
