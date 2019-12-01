<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Computer extends Model
{
    use SoftDeletes;

    protected $fillable = ['name', 'room_id', 'responsible_id', 'type',
        'inventory_id', 'comment'];

    public function room()
    {
        return $this->belongsTo(Room::class);
    }

    public function responsible()
    {
        return $this->belongsTo(User::class, 'responsible_id');
    }
}
