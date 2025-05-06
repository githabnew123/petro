<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Stock extends Model
{
    use HasFactory;

    protected $fillable = ['car_number', 'item_id', 'quantity', 'unit_cost', 'total_cost'];

    // Define the relationship with Item
    public function item()
    {
        return $this->belongsTo(Item::class);
    }
}