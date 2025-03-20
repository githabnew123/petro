<?php

// app/Models/Supplier.php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Supplier extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = ['name', 'phone_no'];

    // Define the relationship with Purchase
    public function purchases()
    {
        return $this->hasMany(Purchase::class);
    }
}