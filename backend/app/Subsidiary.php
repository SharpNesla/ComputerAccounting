<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Subsidiary extends Model
{

    use SoftDeletes;

    protected $fillable = ['name', 'address', 'director_id' , 'comment'];


    public function rooms()
    {
        return $this->hasMany(Room::class);
    }

    public function computers()
    {
        return $this->hasMany(Computer::class);
    }

    public function parts()
    {
        return $this->hasMany(Part::class);
    }


    public function employees()
    {
        return $this->hasMany(User::class);
    }

    public function director()
    {
        return $this->belongsTo(User::class, 'director_id');
    }
}
