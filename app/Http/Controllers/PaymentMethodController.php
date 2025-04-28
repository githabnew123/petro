<?php

// app/Http/Controllers/PaymentMethodController.php

namespace App\Http\Controllers;

use App\Models\PaymentMethod;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PaymentMethodController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->input('search');

        $paymentMethods = PaymentMethod::query()
            ->when($search, function ($query, $search) {
                $query->where('name', 'like', "%{$search}%")
                    ->orWhere('owner', 'like', "%{$search}%")
                    ->orWhere('number', 'like', "%{$search}%");
            })
            ->orderBy('name')
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('PaymentMethod/PaymentMethodIndex', [
            'paymentMethods' => $paymentMethods,
            'filters' => [
                'search' => $search,
            ],
        ]);
    }

    public function create()
    {
        return Inertia::render('PaymentMethod/PaymentMethodCreate'); // Render the create view
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'owner' => 'required|string|max:255'
        ]);

        PaymentMethod::create([
            'name' => $request->name,
            'owner' => $request->owner,
            'number' => $request->number,
        ]);

        return redirect()->route('payment-methods.index')->with('success', 'Payment method created successfully.');
    }

    public function show(PaymentMethod $paymentMethod)
    {
        return Inertia::render('PaymentMethod/PaymentMethodShow', ['paymentMethod' => $paymentMethod]); // Render the show view
    }

    public function edit(PaymentMethod $paymentMethod)
    {
        return Inertia::render('PaymentMethod/PaymentMethodEdit', ['paymentMethod' => $paymentMethod]); // Render the edit view
    }

    public function update(Request $request, PaymentMethod $paymentMethod)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'owner' => 'required|string|max:255',
        ]);

        $paymentMethod->update([
            'name' => $request->name,
            'owner' => $request->owner,
            'number' => $request->number,
        ]);

        return redirect()->route('payment-methods.index')->with('success', 'Payment method updated successfully.');
    }

    public function destroy(PaymentMethod $paymentMethod)
    {
        $paymentMethod->delete();
        return redirect()->route('payment-methods.index')->with('success', 'Payment method deleted successfully.');
    }
}
