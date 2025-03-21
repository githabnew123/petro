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
}