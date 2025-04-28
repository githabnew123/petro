<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Sale extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'customer',
        'item',
        'retail_price',
        'qty',
        'car_number',
        'payment',
        'payment_method',
        'transfer_account',
        'carrier_number',
        'total',
        'balance',
    ];

    public function customer()
    {
        return $this->belongsTo(Customer::class, 'customer'); // Specify the foreign key if it's not 'customer_id'
    }

    public function item()
    {
        return $this->belongsTo(Item::class, 'item');
    }

    public function paymentMethod()
    {
        return $this->belongsTo(PaymentMethod::class, 'payment_method');
    }
    public function payments()
    {
        return $this->hasMany(Payment::class);
    }

    public function getPaidAmountAttribute()
    {
        return $this->payments->sum('amount');
    }

    public function getBalanceAttribute()
    {
        return $this->total - $this->paid_amount;
    }
    public static function boot()
    {
        parent::boot();

        static::created(function ($sale) {
            $stock = Stock::where('item_id', $sale->item_id)->first();
            if ($stock) {
                $stock->quantity -= $sale->qty;
                $stock->save();
            }
        });
    }
}
