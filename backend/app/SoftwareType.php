<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class SoftwareType extends Model
{
    use SoftDeletes;

    protected $fillable = ['typename', 'category', 'comment'];

    public function software()
    {
        return $this->hasMany(Software::class);
    }

    public function dependencies(){
        return $this->belongsToMany(SoftwareType::class, 'dependencies',
            'dependent_id', 'dependency_id');
    }
}
