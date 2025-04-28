<?php

// app/Models/Purchase.php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Purchase extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = ['supplier_id', 'date', 'car_number', 'qty', 'item_id', 'amount', 'total', 'selling_price'];

    // Define the relationship with Supplier
    public function supplier()
    {
        return $this->belongsTo(Supplier::class);
    }

    // Define the relationship with Item
    public function item()
    {
        return $this->belongsTo(Item::class);
    }
    public static function boot()
    {
        parent::boot();

        static::created(function ($purchase) {
            $stock = Stock::firstOrCreate(['item_id' => $purchase->item_id]);
            $stock->quantity += $purchase->qty;
            $stock->unit_cost = $purchase->amount;
            $stock->total_cost = $purchase->total;
            $stock->save();
        });
    }
}
