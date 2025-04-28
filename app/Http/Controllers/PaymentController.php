<?php

namespace App\Http\Controllers;

use App\Models\Sale;
use App\Models\Payment;
use Illuminate\Http\Request;

class PaymentController extends Controller
{
    public function store(Request $request, Sale $sale)
    {
        $request->validate([
            'amount' => 'required|numeric|min:0',
            'payment_method_id' => 'required|exists:payment_methods,id',
            'reference' => 'nullable|string',
            'date' => 'required|date',
        ]);

        $payment = $sale->payments()->create($request->all());
        
        // Create financial record
        $sale->financialRecords()->create([
            'type' => 'income',
            'amount' => $request->amount,
            'category' => 'fuel_sale',
            'date' => $request->date,
            'description' => 'Payment for sale #' . $sale->id,
        ]);

        return redirect()->back()->with('success', 'Payment recorded successfully');
    }
}