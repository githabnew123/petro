<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Support\Facades\DB;

class StockBalance extends Model
{
    use HasFactory;

    protected $fillable = ['car_number', 'item_id', 'issue_quantity'];

    // Define the relationship with Item
    public function item()
    {
        return $this->belongsTo(Item::class);
    }
    
}