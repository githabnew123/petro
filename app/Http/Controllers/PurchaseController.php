<?php

// app/Http/Controllers/PurchaseController.php

namespace App\Http\Controllers;

use App\Models\Purchase;
use App\Models\Supplier;
use App\Models\Item;
use App\Models\Stock;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PurchaseController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->input('search');

        $purchases = Purchase::with(['supplier', 'item'])
            ->when($search, function ($query, $search) {
                $query->whereHas('supplier', function ($q) use ($search) {
                    $q->where('name', 'like', "%{$search}%");
                })
                    ->orWhere('car_number', 'like', "%{$search}%");
            })
            ->orderBy('date', 'desc')
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Purchase/PurchaseIndex', [
            'purchases' => $purchases,
            'filters' => [
                'search' => $search,
            ],
        ]);
    }

    public function create()
    {
        $suppliers = Supplier::all(); // Fetch all suppliers
        $items = Item::all(); // Fetch all items
        return Inertia::render('Purchase/PurchaseCreate', ['suppliers' => $suppliers, 'items' => $items]); // Render the create view
    }

    public function store(Request $request)
    {
        $request->validate([
            'supplier_id' => 'required|exists:suppliers,id',
            'date' => 'required|date',
            'car_number' => 'required|string|max:255',
            'qty' => 'required|integer|min:1',
            'item_id' => 'required|exists:items,id',
            'amount' => 'required|numeric|min:0',
            'selling_price' => 'required|numeric|min:0|gt:amount',
        ]);

        $total = $request->qty * $request->amount;

        Purchase::create([
            'supplier_id' => $request->supplier_id,
            'date' => $request->date,
            'car_number' => $request->car_number,
            'qty' => $request->qty,
            'item_id' => $request->item_id,
            'amount' => $request->amount,
            'total' => $total,
            'selling_price' => $request->selling_price,
        ]);

        Stock::create([
            'car_number' => $request->car_number,
            'item_id' => $request->item_id,
            'quantity' => $request->qty,
            'unit_cost' => $request->amount,
            'total_cost' => $request->total
        ]);

        return redirect()->route('purchases.index')->with('success', 'Purchase created successfully.');
    }

    public function show(Purchase $purchase)
    {
        return Inertia::render('Purchase/PurchaseShow', ['purchase' => $purchase]); // Render the show view
    }

    public function edit(Purchase $purchase)
    {
        $suppliers = Supplier::all(); // Fetch all suppliers
        $items = Item::all(); // Fetch all items
        return Inertia::render('Purchase/PurchaseEdit', [
            'purchase' => $purchase,
            'suppliers' => $suppliers,
            'items' => $items,
        ]); // Render the edit view
    }

    public function update(Request $request, Purchase $purchase)
    {
        $request->validate([
            'supplier_id' => 'required|exists:suppliers,id',
            'date' => 'required|date',
            'car_number' => 'required|string|max:255',
            'qty' => 'required|integer|min:1',
            'item_id' => 'required|exists:items,id',
            'amount' => 'required|numeric|min:0',
            'selling_price' => 'required|numeric|min:0|gt:amount', // selling_price must be greater than amount
        ]);

        $total = $request->qty * $request->amount;

        $purchase->update([
            'supplier_id' => $request->supplier_id,
            'date' => $request->date,
            'car_number' => $request->car_number,
            'qty' => $request->qty,
            'item_id' => $request->item_id,
            'amount' => $request->amount,
            'total' => $total,
            'selling_price' => $request->selling_price,
        ]);

        $stock = Stock::where('car_number', $request->car_number)
            ->where('item_id', $request->item_id)
            ->whereDate('created_at', $purchase->created_at->toDateString())
            ->first();

        if ($stock) {
            $stock->update([
                'car_number' => $request->car_number,
                'item_id' => $request->item_id,
                'quantity' => $request->qty,
                'unit_cost' => $request->amount,
                'total_cost' => $total,
                'selling_price' => $request->selling_price // Added selling_price update
            ]);
        } else {
            // Create new stock record if no exact match found
            Stock::create([
                'car_number' => $request->car_number,
                'item_id' => $request->item_id,
                'quantity' => $request->qty,
                'unit_cost' => $request->amount,
                'total_cost' => $total,
                'selling_price' => $request->selling_price,
                'created_at' => $purchase->created_at // Sync creation dates
            ]);
        }

        return redirect()->route('purchases.index')->with('success', 'Purchase updated successfully.');
    }

    public function destroy(Purchase $purchase)
    {
        $purchase->delete();
        return redirect()->route('purchases.index')->with('success', 'Purchase deleted successfully.');
    }
}
