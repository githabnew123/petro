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

    // public static function boot()
    // {
    //     parent::boot();

    //     static::created(function ($stock) {
    //         // Update stock based on the created stock record
    //         self::updateStock($stock);
    //     });
    // }

    // public static function updateStock($purchase)
    // {
    //     // Look for stock based on car_number and item_id
    //     $stock = Stock::where('car_number', $purchase->car_number)
    //                   ->where('item_id', $purchase->item_id)
    //                   ->first();

    //     if ($stock) {
    //         $stock->quantity += $purchase->qty;
    //         $stock->unit_cost = $purchase->amount;
    //         $stock->total_cost = $purchase->total;
    //         $stock->save();
    //     } else {
    //         // Create a new stock entry if none exists
    //         Stock::create([
    //             'car_number' => $purchase->car_number,
    //             'item_id' => $purchase->item_id,
    //             'quantity' => $purchase->qty,
    //             'unit_cost' => $purchase->amount,
    //             'total_cost' => $purchase->total,
    //         ]);
    //     }
    // }
}