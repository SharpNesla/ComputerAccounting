<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class License extends Model
{
    use SoftDeletes;

    public function softwareType()
    {
        return $this->belongsTo(SoftwareType::class);
    }

    public function software()
    {
        return $this->hasMany(Software::class);
    }
}
