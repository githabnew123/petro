<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Customer extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = ['name', 'phone_no'];

    public function sales()
    {
        return $this->hasMany(Sale::class, 'customer'); // Specify the foreign key if it's not 'customer_id'
    }
}