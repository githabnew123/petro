<?php

// app/Http/Controllers/FinancialRecordController.php
namespace App\Http\Controllers;

use App\Models\FinancialRecord;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FinancialRecordController extends Controller
{
    public function index(Request $request)
    {
        $records = FinancialRecord::query()
            ->when($request->input('search'), function ($query, $search) {
                $query->where('description', 'like', "%{$search}%")
                    ->orWhere('category', 'like', "%{$search}%");
            })
            ->when($request->input('type'), function ($query, $type) {
                $query->where('type', $type);
            })
            ->orderBy('date', 'desc')
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('FinancialRecords/Index', [
            'records' => $records,
            'filters' => $request->only(['search', 'type']),
        ]);
    }

    public function create()
    {
        return Inertia::render('FinancialRecords/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'type' => 'required|in:income,expense',
            'amount' => 'required|numeric|min:0',
            'category' => 'required|string|max:255',
            'description' => 'nullable|string',
            'date' => 'required|date',
        ]);

        FinancialRecord::create($request->all());

        return redirect()->route('financial-records.index')
            ->with('success', 'Financial record created successfully.');
    }

    public function edit(FinancialRecord $financialRecord)
    {
        return Inertia::render('FinancialRecords/Edit', [
            'record' => $financialRecord,
        ]);
    }

    public function update(Request $request, FinancialRecord $financialRecord)
    {
        $request->validate([
            'type' => 'required|in:income,expense',
            'amount' => 'required|numeric|min:0',
            'category' => 'required|string|max:255',
            'description' => 'nullable|string',
            'date' => 'required|date',
        ]);

        $financialRecord->update($request->all());

        return redirect()->route('financial-records.index')
            ->with('success', 'Financial record updated successfully.');
    }

    public function destroy(FinancialRecord $financialRecord)
    {
        $financialRecord->delete();

        return redirect()->route('financial-records.index')
            ->with('success', 'Financial record deleted successfully.');
    }
}