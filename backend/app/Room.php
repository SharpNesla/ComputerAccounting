<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Room extends Model
{
    use SoftDeletes;

    protected $fillable = ['number', 'subsidiary_id', 'comment'];

    public function subsidiary()
    {
        return $this->belongsTo(Subsidiary::class);
    }
}
