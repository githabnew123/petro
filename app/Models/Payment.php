<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{
    protected $fillable = ['sale_id', 'amount', 'payment_method_id', 'reference', 'date'];
    
    public function sale()
    {
        return $this->belongsTo(Sale::class);
    }
    
    public function paymentMethod()
    {
        return $this->belongsTo(PaymentMethod::class);
    }
}