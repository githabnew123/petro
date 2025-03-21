<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\SupplierController;
use App\Http\Controllers\ItemController;
use App\Http\Controllers\PaymentMethodController;
use App\Http\Controllers\PurchaseController;
use App\Http\Controllers\SaleController;

Route::get('/', [SaleController::class, 'create']);
Route::get('sale-summary', [SaleController::class, 'index']);

Route::resource('customers', CustomerController::class);
Route::resource('suppliers', SupplierController::class);
Route::resource('items', ItemController::class);
Route::resource('payment-methods', PaymentMethodController::class);
Route::resource('purchases', PurchaseController::class);
Route::resource('sales', SaleController::class);

require __DIR__.'/auth.php';