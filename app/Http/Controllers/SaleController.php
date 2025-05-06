<?php

// app/Http/Controllers/SaleController.php

namespace App\Http\Controllers;

use App\Models\Sale;
use App\Models\Customer;
use App\Models\Item;
use App\Models\PaymentMethod;
use App\Models\Stock;
use App\Models\StockBalance;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

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

        StockBalance::create([
            'car_number' => $request->car_number,
            'item_id' => $request->item,
            'issue_quantity' => $request->qty,
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
        'retail_price' => 'required|numeric|min:0',
        'qty' => 'required|integer|min:1',
        'payment_method' => 'required|exists:payment_methods,id',
        'car_number' => 'required|string|max:255',
        'payment' => 'required|numeric|min:0',
        'transfer_account' => 'nullable|string|max:255',
        'carrier_number' => 'nullable|string|max:255',
        'total' => 'required|numeric|min:0',
        'balance' => 'required|numeric',
    ]);

    // Use database transaction to ensure atomicity
    DB::beginTransaction();

    try {
        // First check stock availability if quantity is being increased
        $quantityDifference = $request->qty - $sale->qty;
        
        if ($quantityDifference > 0) {
            $stock = Stock::where('item_id', $request->item)
                        ->where('car_number', $request->car_number)
                        ->first();

            $stockBalance = StockBalance::where('item_id', $request->item)
                            ->where('car_number', $request->car_number)
                            ->sum('issue_quantity');

            $availableQty = ($stock ? $stock->quantity : 0) - ($stockBalance ?? 0);

            if ($availableQty < $quantityDifference) {
                throw new \Exception('Not enough stock available');
            }
        }

        // Update the sale record
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

        // Update stock balance
        $stockBalanceRecord = StockBalance::where('car_number', $request->car_number)
            ->where('item_id', $request->item)
            ->whereDate('created_at', $sale->created_at->toDateString())
            ->first();

        if ($stockBalanceRecord) {
            $stockBalanceRecord->update([
                'issue_quantity' => $stockBalanceRecord->issue_quantity + $quantityDifference,
            ]);
        } else {
            StockBalance::create([
                'car_number' => $request->car_number,
                'item_id' => $request->item,
                'issue_quantity' => $request->qty,
            ]);
        }

        DB::commit();
        return redirect()->route('sales.index')->with('success', 'Sale updated successfully.');

    } catch (\Exception $e) {
        DB::rollBack();
        return back()->with('error', $e->getMessage())->withInput();
    }
}

    public function destroy(Sale $sale)
    {
        $sale->delete();
        return redirect()->route('sales.index')->with('success', 'Sale deleted successfully.');
    }

    public function getStockBalance(Request $request)
    {
        $itemId = $request->query('item_id');
        $carNumber = $request->query('car_number');

        // Fetch the stock record
        $stock = Stock::where('item_id', $itemId)
            ->where('car_number', $carNumber)
            ->first(['quantity']); // Use first() to get a single record

        // Fetch the stock balance record
        $stockBalance = StockBalance::where('item_id', $itemId)
            ->where('car_number', $carNumber)
            ->first(['issue_quantity']); // Use first() to get a single record

        // Check if stock and stock balance exist
        if ($stock && $stockBalance) {
            $availableQty = $stock->quantity - $stockBalance->issue_quantity;
        } elseif ($stock) {
            $availableQty = $stock->quantity; // No stock balance, return stock quantity
        } else {
            $availableQty = 0; // No stock found
        }

        return response()->json(['available_qty' => $availableQty]);
    }

    public function getAvailableCarNumber(Request $request)
    {
        $itemId = $request->query('item_id');

        // Get all stocks for the item
        $stocks = Stock::where('item_id', $itemId)->get();

        $availableCarNumbers = [];

        foreach ($stocks as $stock) {
            // Get the stock balance for this car number
            $stockBalance = StockBalance::where('item_id', $itemId)
                ->where('car_number', $stock->car_number)
                ->first(['issue_quantity']);

            // Calculate available quantity
            $availableQty = $stock->quantity;
            if ($stockBalance) {
                $availableQty -= $stockBalance->issue_quantity;
            }

            // Only include car numbers with available stock
            if ($availableQty > 0) {
                $availableCarNumbers[] = [
                    'car_number' => $stock->car_number,
                    'available_qty' => $availableQty
                ];
            }
        }

        return response()->json($availableCarNumbers);
    }
}
