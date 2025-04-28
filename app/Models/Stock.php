<?php

// app/Models/Stock.php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Stock extends Model
{
    protected $fillable = ['item_id', 'quantity', 'unit_cost', 'total_cost'];
    
    public function item()
    {
        return $this->belongsTo(Item::class);
    }
}