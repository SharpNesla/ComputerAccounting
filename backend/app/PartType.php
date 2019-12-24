<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class PartType extends Model
{
    use SoftDeletes;

    protected $fillable = ['model', 'category', 'cost', 'characteristics', 'comment'];

    public function parts()
    {
        return $this->hasMany(Part::class);
    }

    public function driver()
    {
        return $this->belongsTo(SoftwareType::class, 'driver_id');
    }
}
