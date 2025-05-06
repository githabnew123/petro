<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\SupplierController;
use App\Http\Controllers\ItemController;
use App\Http\Controllers\PaymentMethodController;
use App\Http\Controllers\PurchaseController;
use App\Http\Controllers\SaleController;
use App\Http\Controllers\StockController;
use App\Http\Controllers\StockBalanceController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\FinancialRecordController;

Route::get('/', [SaleController::class, 'create']);
Route::get('sale-summary', [SaleController::class, 'index']);

Route::resource('customers', CustomerController::class);
Route::resource('suppliers', SupplierController::class);
Route::resource('items', ItemController::class);
Route::resource('payment-methods', PaymentMethodController::class);
Route::resource('purchases', PurchaseController::class);
Route::resource('sales', SaleController::class);

Route::get('/stock-balance', [SaleController::class, 'getStockBalance']);
Route::get('/car-numbers', [SaleController::class, 'getAvailableCarNumber']);
// routes/web.php

Route::resource('stocks', StockController::class);
Route::resource('stockbalances', StockBalanceController::class);
Route::get('stocks/levels', [StockController::class, 'levels'])->name('stocks.levels');

// Payment routes
Route::post('/sales/{sale}/payments', [PaymentController::class, 'store'])->name('payments.store');

// Financial routes
Route::post('/financial-records', [FinancialRecordController::class, 'store'])->name('financial-records.store');

require __DIR__.'/auth.php';