<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\SupplierController;
use App\Http\Controllers\ItemController;
use App\Http\Controllers\PaymentMethodController;
use App\Http\Controllers\PurchaseController;
use App\Http\Controllers\SaleController;
use App\Http\Controllers\ReportController;
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
// routes/web.php

// Stock routes
Route::get('/stock', [ReportController::class, 'stockReport'])->name('stock.report');

// Payment routes
Route::post('/sales/{sale}/payments', [PaymentController::class, 'store'])->name('payments.store');

// Financial routes
Route::get('/reports/financial', [ReportController::class, 'financialReport'])->name('reports.financial');
Route::post('/financial-records', [FinancialRecordController::class, 'store'])->name('financial-records.store');

require __DIR__.'/auth.php';