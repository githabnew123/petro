<?php

namespace App\Http\Controllers;

use App\Models\Stock;
use App\Models\Item;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class StockController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->input('search');
        $viewType = $request->input('view_type', 'item'); // Default to item view

        if ($viewType === 'item') {
            // Aggregate view by item
            $stocks = Stock::select([
                'item_id',
                DB::raw('group_concat(distinct car_number) as car_numbers'),
                DB::raw('sum(quantity) as total_quantity'),
                DB::raw('avg(unit_cost) as average_cost'),
                DB::raw('sum(total_cost) as total_cost'),
                DB::raw('max(updated_at) as last_updated')
            ])
                ->with(['item'])
                ->when($search, function ($query, $search) {
                    $query->whereHas('item', function ($q) use ($search) {
                        $q->where('name', 'like', "%{$search}%");
                    });
                })
                ->groupBy('item_id')
                ->orderBy('last_updated', 'desc')
                ->paginate(10)
                ->withQueryString();

            $stocks->getCollection()->transform(function ($item) {
                return [
                    'item_id' => $item->item_id,
                    'item_name' => $item->item->name,
                    'car_numbers' => explode(',', $item->car_numbers),
                    'total_quantity' => $item->total_quantity,
                    'average_cost' => $item->average_cost,
                    'total_cost' => $item->total_cost,
                    'last_updated' => $item->last_updated,
                    'view_type' => 'item'
                ];
            });
        } else {
            // Detailed view by car number
            $stocks = Stock::with(['item'])
                ->when($search, function ($query, $search) {
                    $query->whereHas('item', function ($q) use ($search) {
                        $q->where('name', 'like', "%{$search}%");
                    })
                        ->orWhere('car_number', 'like', "%{$search}%");
                })
                ->orderBy('updated_at', 'desc')
                ->paginate(10)
                ->withQueryString();
        }

        return Inertia::render('Stock/StockIndex', [
            'stocks' => $stocks,
            'filters' => [
                'search' => $search,
                'view_type' => $viewType
            ],
        ]);
    }

    public function create()
    {
        $items = Item::all();
        return Inertia::render('Stock/StockCreate', [
            'items' => $items,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'car_number' => 'required|string|max:255',
            'item_id' => 'required|exists:items,id',
            'quantity' => 'required|integer|min:1',
            'unit_cost' => 'required|numeric|min:0.01',
            'selling_price' => 'required|numeric|min:0.01|gt:unit_cost',
        ]);

        $total_cost = $request->quantity * $request->unit_cost;

        Stock::create([
            'car_number' => $request->car_number,
            'item_id' => $request->item_id,
            'quantity' => $request->quantity,
            'unit_cost' => $request->unit_cost,
            'total_cost' => $total_cost,
            'selling_price' => $request->selling_price,
        ]);

        return redirect()->route('stocks.index')->with('success', 'Stock created successfully.');
    }

    public function show(Stock $stock)
    {
        $stock->load('item');
        return Inertia::render('Stock/StockShow', [
            'stock' => $stock,
        ]);
    }

    public function edit(Stock $stock)
    {
        $items = Item::all();
        return Inertia::render('Stock/StockEdit', [
            'stock' => $stock,
            'items' => $items,
        ]);
    }

    public function update(Request $request, Stock $stock)
    {
        $request->validate([
            'car_number' => 'required|string|max:255',
            'item_id' => 'required|exists:items,id',
            'quantity' => 'required|integer|min:1',
            'unit_cost' => 'required|numeric|min:0.01',
            'selling_price' => 'required|numeric|min:0.01|gt:unit_cost',
        ]);

        $total_cost = $request->quantity * $request->unit_cost;

        $stock->update([
            'car_number' => $request->car_number,
            'item_id' => $request->item_id,
            'quantity' => $request->quantity,
            'unit_cost' => $request->unit_cost,
            'total_cost' => $total_cost,
            'selling_price' => $request->selling_price,
        ]);

        return redirect()->route('stocks.index')->with('success', 'Stock updated successfully.');
    }

    public function destroy(Stock $stock)
    {
        $stock->delete();
        return redirect()->route('stocks.index')->with('success', 'Stock deleted successfully.');
    }

    // Additional method to get stock levels (optional)
    public function levels()
    {
        $stocks = Stock::with('item')
            ->selectRaw('item_id, sum(quantity) as total_quantity, avg(unit_cost) as average_cost')
            ->groupBy('item_id')
            ->get();

        return Inertia::render('Stock/StockLevels', [
            'stocks' => $stocks,
        ]);
    }
}
