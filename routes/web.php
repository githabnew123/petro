<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\SupplierController;
use App\Http\Controllers\ItemController;
use App\Http\Controllers\PaymentMethodController;
use App\Http\Controllers\PurchaseController;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('SalePage');
});

Route::resource('customers', CustomerController::class);
Route::resource('suppliers', SupplierController::class);
Route::resource('items', ItemController::class);
Route::resource('payment-methods', PaymentMethodController::class);
Route::resource('purchases', PurchaseController::class);

require __DIR__.'/auth.php';