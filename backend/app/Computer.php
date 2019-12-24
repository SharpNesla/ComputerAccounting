<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Computer extends Model
{
    use SoftDeletes;

    protected $fillable = ['name', 'subsidiary_id',
        'room_id', 'responsible_id', 'type',
        'inventory_id', 'comment'];

    public function subsidiary()
    {
        return $this->belongsTo(Subsidiary::class);
    }

    public function room()
    {
        return $this->belongsTo(Room::class);
    }

    public function responsible()
    {
        return $this->belongsTo(User::class, 'responsible_id');
    }

    public function parts()
    {
        return $this->hasMany(Part::class);
    }

    public function users()
    {
        return $this->belongsToMany(User::class, 'users', 'computer_id', 'employee_id');
    }

    public function licenses()
    {
        return $this->belongsToMany(License::class, 'software',
            'computer_id', 'license_id');
    }

    public function dependencyTypes()
    {
        return $this->belongsToMany(SoftwareType::class, 'software',
            'computer_id', 'software_type_id');
    }
}
