<?php

// app/Http/Controllers/CustomerController.php

namespace App\Http\Controllers;

use App\Models\Customer;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CustomerController extends Controller
{
    public function index()
    {
        $customers = Customer::all();
        return Inertia::render('Customer/CustomerIndex', ['customers' => $customers]); // Render the index view
    }

    public function create()
    {
        return Inertia::render('Customer/CustomerCreate'); // Render the create view
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'phone_no' => 'required|string|max:15',
        ]);

        Customer::create([
            'name' => $request->name,
            'phone_no' => $request->phone_no,
        ]);

        return redirect()->route('customers.index')->with('success', 'Customer created successfully.');
    }

    public function show(Customer $customer)
    {
        return Inertia::render('Customer/CustomerShow', ['customer' => $customer]); // Render the show view
    }

    public function edit(Customer $customer)
    {
        return Inertia::render('Customer/CustomerEdit', ['customer' => $customer]); // Render the edit view
    }

    public function update(Request $request, Customer $customer)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'phone_no' => 'required|string|max:15',
        ]);

        $customer->update([
            'name' => $request->name,
            'phone_no' => $request->phone_no,
        ]);

        return redirect()->route('customers.index')->with('success', 'Customer updated successfully.');
    }

    public function destroy(Customer $customer)
    {
        $customer->delete();
        return redirect()->route('customers.index')->with('success', 'Customer deleted successfully.');
    }
}