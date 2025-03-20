<?php
// database/migrations/xxxx_xx_xx_xxxxxx_create_purchases_table.php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePurchasesTable extends Migration
{
    public function up()
    {
        Schema::create('purchases', function (Blueprint $table) {
            $table->id();
            $table->foreignId('supplier_id')->constrained()->onDelete('cascade'); // Foreign key to suppliers
            $table->date('date');
            $table->string('car_number');
            $table->integer('qty');
            $table->foreignId('item_id')->constrained()->onDelete('cascade'); // Foreign key to items
            $table->decimal('amount', 10, 2);
            $table->decimal('total', 10, 2);
            $table->decimal('selling_price', 10, 2);
            $table->timestamps();
            $table->softDeletes(); // Add soft deletes
        });
    }

    public function down()
    {
        Schema::dropIfExists('purchases');
    }
}