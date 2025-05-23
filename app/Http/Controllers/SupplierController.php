<?php

// app/Http/Controllers/SupplierController.php

namespace App\Http\Controllers;

use App\Models\Supplier;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SupplierController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->input('search');

        $query = Supplier::query();

        if ($search) {
            $query->where('name', 'like', "%{$search}%")
                ->orWhere('phone_no', 'like', "%{$search}%");
        }

        $suppliers = $query->orderBy('id', 'desc')->paginate(5)->withQueryString(); // paginate 5 per page

        return Inertia::render('Supplier/SupplierIndex', [
            'suppliers' => $suppliers,
            'filters' => [
                'search' => $search,
            ],
        ]);
    }

    public function create()
    {
        return Inertia::render('Supplier/SupplierCreate'); // Render the create view
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'phone_no' => 'required|string|max:15',
        ]);

        Supplier::create([
            'name' => $request->name,
            'phone_no' => $request->phone_no,
        ]);

        return redirect()->route('suppliers.index')->with('success', 'Supplier created successfully.');
    }

    public function show(Supplier $supplier)
    {
        return Inertia::render('Supplier/SupplierShow', ['supplier' => $supplier]); // Render the show view
    }

    public function edit(Supplier $supplier)
    {
        return Inertia::render('Supplier/SupplierEdit', ['supplier' => $supplier]); // Render the edit view
    }

    public function update(Request $request, Supplier $supplier)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'phone_no' => 'required|string|max:15',
        ]);

        $supplier->update([
            'name' => $request->name,
            'phone_no' => $request->phone_no,
        ]);

        return redirect()->route('suppliers.index')->with('success', 'Supplier updated successfully.');
    }

    public function destroy(Supplier $supplier)
    {
        $supplier->delete();
        return redirect()->route('suppliers.index')->with('success', 'Supplier deleted successfully.');
    }
}
