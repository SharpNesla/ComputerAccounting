<?php

namespace App;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class License extends Model
{
    use SoftDeletes;

    protected $appends = ['status'];

    protected $fillable = [
        'cost', 'eula', 'max_apply_count',
        'software_type_id', 'comment'];

    public function softwareType()
    {
        return $this->belongsTo(SoftwareType::class);
    }

    public function software()
    {
        return $this->hasMany(Software::class);
    }

    public function getStatusAttribute()
    {
        return Carbon::now() >= $this->expiration_date ? 1 : 0;
    }

}
