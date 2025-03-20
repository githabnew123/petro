<?php

// app/Http/Controllers/ItemController.php

namespace App\Http\Controllers;

use App\Models\Item;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ItemController extends Controller
{
    public function index()
    {
        $items = Item::all(); // Fetch all items
        return Inertia::render('Item/ItemIndex', ['items' => $items]); // Render the index view
    }

    public function create()
    {
        return Inertia::render('Item/ItemCreate'); // Render the create view
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
        ]);

        Item::create([
            'name' => $request->name,
        ]);

        return redirect()->route('items.index')->with('success', 'Item created successfully.');
    }

    public function show(Item $item)
    {
        return Inertia::render('Item/ItemShow', ['item' => $item]); // Render the show view
    }

    public function edit(Item $item)
    {
        return Inertia::render('Item/ItemEdit', ['item' => $item]); // Render the edit view
    }

    public function update(Request $request, Item $item)
    {
        $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $item->update([
            'name' => $request->name,
        ]);

        return redirect()->route('items.index')->with('success', 'Item updated successfully.');
    }

    public function destroy(Item $item)
    {
        $item->delete();
        return redirect()->route('items.index')->with('success', 'Item deleted successfully.');
    }
}