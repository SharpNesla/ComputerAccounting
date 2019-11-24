<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Software extends Model
{
    protected $fillable = ['software_type_id', 'computer_id', 'comment'];
    use SoftDeletes;
}
