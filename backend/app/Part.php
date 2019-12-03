<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Part extends Model
{
    use SoftDeletes;

    protected $fillable = ['computer_id', 'subsidiary_id', 'part_type_id', 'comment'];

    public function partType()
    {
        return $this->belongsTo(PartType::class);
    }

    public function computer()
    {
        return $this->belongsTo(Computer::class);
    }

    public function subsidiary()
    {
        return $this->belongsTo(Subsidiary::class);
    }
}
