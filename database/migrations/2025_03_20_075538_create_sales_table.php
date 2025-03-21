<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('sales', function (Blueprint $table) {
            $table->id();
            $table->foreignId('customer')->constrained()->onDelete('cascade'); // Foreign key to customers table
            $table->foreignId('item')->constrained()->onDelete('cascade'); // Foreign key to items table
            $table->decimal('retail_price', 10, 2); // Retail price
            $table->integer('qty'); // Quantity
            $table->string('car_number'); // Car number
            $table->decimal('payment', 10, 2); // Payment amount
            $table->foreignId('payment_method')->constrained()->onDelete('cascade'); // Foreign key to payment_methods table
            $table->string('transfer_account'); // Transfer account
            $table->string('carrier_number'); // Carrier number
            $table->decimal('total'); // Carrier name
            $table->decimal('balance');
            $table->timestamps(); // Created at and updated at timestamps
            $table->softDeletes(); // Add soft deletes
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sales');
    }
};