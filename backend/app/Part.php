<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Part extends Model
{
    use SoftDeletes;

    public function partType()
    {
        return $this->belongsTo(PartType::class);
    }

    public function computer()
    {
        return $this->belongsTo(Computer::class);
    }
}
