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

    public function director(){
        return $this->belongsTo(User::class, 'director_id');
    }
}
