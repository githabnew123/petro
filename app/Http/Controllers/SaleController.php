<?php

// app/Http/Controllers/SaleController.php

namespace App\Http\Controllers;

use App\Models\Sale;
use App\Models\Customer;
use App\Models\Item;
use App\Models\PaymentMethod;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SaleController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->input('search');

        $sales = Sale::with(['customer', 'item', 'paymentMethod'])
            ->when($search, function ($query, $search) {
                $query->whereHas('customer', function ($q) use ($search) {
                    $q->where('name', 'like', "%{$search}%");
                })
                    ->orWhereHas('item', function ($q) use ($search) {
                        $q->where('name', 'like', "%{$search}%");
                    });
            })
            ->orderBy('created_at', 'desc')
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Sale/SaleIndex', [
            'sales' => $sales,
            'filters' => [
                'search' => $search,
            ],
        ]);
    }

    public function create()
    {
        $customers = Customer::all();
        $items = Item::all();
        $paymentMethods = PaymentMethod::all();
        return Inertia::render('Sale/SaleCreate', ['customers' => $customers, 'items' => $items, 'paymentMethods' => $paymentMethods]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'customer' => 'required|exists:customers,id',
            'item' => 'required|exists:items,id',
            'retail_price' => 'required|numeric',
            'qty' => 'required|integer|min:1',
            'payment_method' => 'required|exists:payment_methods,id',
            'car_number' => 'required|string|max:255',
            'payment' => 'required|numeric',
            'transfer_account' => 'required|string',
            'carrier_number' => 'required|string',
            'total' => 'required|numeric',
            'balance' => 'required|numeric',
        ]);

        Sale::create([
            'customer' => $request->customer,
            'item' => $request->item,
            'retail_price' => $request->retail_price,
            'qty' => $request->qty,
            'payment_method' => $request->payment_method,
            'car_number' => $request->car_number,
            'payment' => $request->payment,
            'transfer_account' => $request->transfer_account,
            'carrier_number' => $request->carrier_number,
            'total' => $request->total,
            'balance' => $request->balance
        ]);

        return redirect()->route('sales.index')->with('success', 'Sale created successfully.');
    }

    public function show(Sale $sale)
    {
        return Inertia::render('Sale/SaleShow', ['sale' => $sale]);
    }

    public function edit(Sale $sale)
    {
        $customers = Customer::all();
        $items = Item::all();
        $paymentMethods = PaymentMethod::all();
        return Inertia::render('Sale/SaleEdit', [
            'sale' => $sale,
            'customers' => $customers,
            'items' => $items,
            'paymentMethods' => $paymentMethods,
        ]);
    }

    public function update(Request $request, Sale $sale)
    {
        $request->validate([
            'customer' => 'required|exists:customers,id',
            'item' => 'required|exists:items,id',
            'retail_price' => 'required|numeric',
            'qty' => 'required|integer|min:1',
            'payment_method' => 'required|exists:payment_methods,id',
            'car_number' => 'required|string|max:255',
            'payment' => 'required|numeric',
            'transfer_account' => 'required|string',
            'carrier_number' => 'required|string',
            'total' => 'required|numeric',
            'balance' => 'required|numeric',
        ]);

        $sale->update([
            'customer' => $request->customer,
            'item' => $request->item,
            'retail_price' => $request->retail_price,
            'qty' => $request->qty,
            'payment_method' => $request->payment_method,
            'car_number' => $request->car_number,
            'payment' => $request->payment,
            'transfer_account' => $request->transfer_account,
            'carrier_number' => $request->carrier_number,
            'total' => $request->total,
            'balance' => $request->balance,
        ]);

        return redirect()->route('sales.index')->with('success', 'Sale updated successfully.');
    }

    public function destroy(Sale $sale)
    {
        $sale->delete();
        return redirect()->route('sales.index')->with('success', 'Sale deleted successfully.');
    }
}
