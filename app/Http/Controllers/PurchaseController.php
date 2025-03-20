<?php

// app/Http/Controllers/PurchaseController.php

namespace App\Http\Controllers;

use App\Models\Purchase;
use App\Models\Supplier;
use App\Models\Item;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PurchaseController extends Controller
{
    public function index()
    {
        $purchases = Purchase::with(['supplier', 'item'])->get(); // Fetch all purchases with related supplier and item
        return Inertia::render('Purchase/PurchaseIndex', ['purchases' => $purchases]); // Render the index view
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
            'selling_price' => 'required|numeric|min:0|gt:amount', // selling_price must be greater than amount
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

        return redirect()->route('purchases.index')->with('success', 'Purchase updated successfully.');
    }

    public function destroy(Purchase $purchase)
    {
        $purchase->delete();
        return redirect()->route('purchases.index')->with('success', 'Purchase deleted successfully.');
    }
}
