<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Purchase extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = ['supplier_id', 'date', 'car_number', 'qty', 'item_id', 'amount', 'total', 'selling_price'];

    public function supplier()
    {
        return $this->belongsTo(Supplier::class);
    }

    public function item()
    {
        return $this->belongsTo(Item::class);
    }

    // public static function boot()
    // {
    //     parent::boot();

    //     static::created(function ($purchase) {
    //         // Update stock based on the created purchase record
    //         Stock::updateStock($purchase);
    //     });
    // }
}