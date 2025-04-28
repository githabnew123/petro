<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class FinancialRecord extends Model
{
    protected $fillable = ['type', 'amount', 'category', 'description', 'date', 'recordable_type', 'recordable_id'];
    
    public function recordable()
    {
        return $this->morphTo();
    }
}