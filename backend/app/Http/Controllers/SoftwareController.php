<?php

namespace App\Http\Controllers;

use App\Software;
use Illuminate\Database\Eloquent\Builder;

class SoftwareController extends PackControllerBase
{
    function __construct() {
        parent::__construct(Software::class);
    }

    public function getById($id)
    {
        return Software::with('softwareType')
            ->with('computer')
            ->with('license')
            ->findOrFail($id);
    }

    protected function applyFilters(array $filter, Builder $builder): Builder
    {
        if(array_key_exists('software_type_id', $filter)){
            $builder = $builder->where('software_type_id', $filter['software_type_id']);
        }

        if(array_key_exists('computer_id', $filter)){
            $builder = $builder->where('computer_id', $filter['computer_id']);
        }

        if(array_key_exists('license_id', $filter)){
            $builder = $builder->where('license_id', $filter['license_id']);
        }

        return $builder;
    }
}
