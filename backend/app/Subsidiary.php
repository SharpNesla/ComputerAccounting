<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Subsidiary extends Model
{

    use SoftDeletes;

    protected $fillable = ['name', 'address', 'comment'];
}
