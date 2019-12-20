<?php

namespace App;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class License extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'cost', 'eula', 'max_apply_count',
        'purchased_at',
        'expired_at',
        'software_type_id', 'comment'];

    public function softwareType()
    {
        return $this->belongsTo(SoftwareType::class);
    }

    public function software()
    {
        return $this->hasMany(Software::class);
    }
}
