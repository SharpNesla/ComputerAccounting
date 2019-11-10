<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Room extends Model
{
    public function subsidiary()
    {
        return $this->belongsTo(App\Subsidiary::class);
    }
}
