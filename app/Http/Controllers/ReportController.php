<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Sale;
use App\Models\Purchase;
use App\Models\FinancialRecord;
use Carbon\Carbon;

class ReportController extends Controller
{
    public function stockReport()
    {
        $stocks = \App\Models\Stock::with('item')->get();
        return view('reports.stock', compact('stocks'));
    }
    
    public function financialReport(Request $request)
    {
        $startDate = $request->input('start_date', Carbon::now()->startOfMonth());
        $endDate = $request->input('end_date', Carbon::now()->endOfMonth());
        
        $sales = Sale::whereBetween('created_at', [$startDate, $endDate])->get();
        $purchases = Purchase::whereBetween('created_at', [$startDate, $endDate])->get();
        $expenses = FinancialRecord::where('type', 'expense')
            ->whereBetween('date', [$startDate, $endDate])
            ->get();
        
        $totalIncome = $sales->sum('total') + FinancialRecord::where('type', 'income')
            ->whereBetween('date', [$startDate, $endDate])
            ->sum('amount');
        $totalExpense = $purchases->sum('total') + $expenses->sum('amount');
        $profit = $totalIncome - $totalExpense;
        
        return view('reports.financial', compact(
            'sales', 'purchases', 'expenses', 
            'totalIncome', 'totalExpense', 'profit',
            'startDate', 'endDate'
        ));
    }
}