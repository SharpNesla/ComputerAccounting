<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Software extends Model
{
    use SoftDeletes;

    protected $fillable = ['software_type_id', 'license_id', 'computer_id', 'comment'];

    public function softwareType()
    {
        return $this->belongsTo(SoftwareType::class);
    }

    public function computer()
    {
        return $this->belongsTo(Computer::class);
    }

    public function license(){
        return $this->belongsTo(License::class);
    }
}
