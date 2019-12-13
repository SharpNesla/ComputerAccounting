<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class License extends Model
{
    use SoftDeletes;

    protected $fillable = ['purchase_date', 'cost', 'eula', 'max_apply_count',
        'expiration_date', 'is_ends_on_date', 'comment'];

    public function softwareType()
    {
        return $this->belongsTo(SoftwareType::class);
    }

    public function software()
    {
        return $this->hasMany(Software::class);
    }
}
