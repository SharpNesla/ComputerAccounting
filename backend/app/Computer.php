<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Computer extends Model
{
    use SoftDeletes;

    protected $fillable = ['name', 'inventory_id', 'comment'];

    public function room()
    {
        return $this->belongsTo(Room::class);
    }
}
