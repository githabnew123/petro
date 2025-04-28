<?php

namespace App\Http\Controllers;

use App\Models\StockBalance;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class StockBalanceController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->input('search');
        $viewType = $request->input('view_type', 'item');

        DB::statement("SET SESSION group_concat_max_len = 1000000;");

        if ($viewType === 'item') {
            // Aggregate view by item
            $stockBalances = StockBalance::select([
                    'item_id',
                    DB::raw('GROUP_CONCAT(DISTINCT car_number ORDER BY car_number SEPARATOR ", ") as car_numbers'),
                    DB::raw('SUM(issue_quantity) as total_quantity'),
                    DB::raw('MAX(updated_at) as last_updated')
                ])
                ->with('item:id,name') // Only get id, name
                ->when($search, function ($query, $search) {
                    $query->whereHas('item', function ($q) use ($search) {
                        $q->where('name', 'like', "%{$search}%");
                    });
                })
                ->groupBy('item_id')
                ->orderByDesc('last_updated')
                ->paginate(10)
                ->withQueryString();

            // Ensure id field exists for React key
            $stockBalances->getCollection()->transform(function ($item) {
                return [
                    'id' => $item->item_id, // Important! Use item_id as id
                    'item_id' => $item->item_id,
                    'item_name' => $item->item->name ?? '',
                    'car_numbers' => $item->car_numbers ?? '',
                    'total_quantity' => (int) $item->total_quantity,
                    'last_updated' => $item->last_updated,
                    'view_type' => 'item'
                ];
            });
        } else {
            // Detailed view by car number
            $stockBalances = StockBalance::with('item:id,name')
                ->when($search, function ($query, $search) {
                    $query->where(function($q) use ($search) {
                        $q->whereHas('item', function ($q) use ($search) {
                            $q->where('name', 'like', "%{$search}%");
                        })
                        ->orWhere('car_number', 'like', "%{$search}%");
                    });
                })
                ->orderByDesc('updated_at')
                ->paginate(10)
                ->withQueryString();
        }

        return Inertia::render('StockBalance/StockBalanceIndex', [
            'stockBalances' => $stockBalances,
            'filters' => [
                'search' => $search,
                'view_type' => $viewType,
            ],
        ]);
    }
}
