import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { Link } from '@inertiajs/inertia-react';
import Layout from '../../Layouts/Layout';

interface StockItem {
  id?: number;
  item_id?: number;
  item_name?: string;
  car_number?: string;
  car_numbers?: string[];
  quantity?: number;
  total_quantity?: number;
  unit_cost?: number;
  average_cost?: number;
  total_cost?: number;
  selling_price?: number;
  updated_at?: string;
  last_updated?: string;
  item?: {
    id: number;
    name: string;
  };
  view_type?: string;
}

interface StockPageProps {
  stocks: {
    data: StockItem[];
    links: any[];
    current_page: number;
    last_page: number;
  };
  filters: {
    search: string;
    view_type: string;
  };
}

const StockIndex: React.FC<StockPageProps> = ({ stocks, filters }) => {
  const [search, setSearch] = useState(filters.search || '');
  const [viewType, setViewType] = useState(filters.view_type || 'item');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    Inertia.get('/stocks', { search, view_type: viewType });
  };

  const handleViewTypeChange = (type: string) => {
    setViewType(type);
    Inertia.get('/stocks', { search, view_type: type });
  };

  return (
    <Layout selectedSection="Stock">
      <div>
        <h1 className="text-2xl font-bold mb-4">Stock Inventory</h1>

        <div className="flex justify-between mb-4">
          {/* Search and View Toggle */}
          <div className="flex items-center space-x-4">
            <form onSubmit={handleSearch} className="flex">
              <input
                type="text"
                placeholder={`Search by ${viewType === 'item' ? 'item' : 'item or car number'}`}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="border px-4 py-2 rounded-l"
              />
              <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-r">
                Search
              </button>
            </form>

            <div className="flex space-x-2">
              <button
                onClick={() => handleViewTypeChange('item')}
                className={`px-3 py-1 rounded ${viewType === 'item' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
              >
                Item View
              </button>
              <button
                onClick={() => handleViewTypeChange('car')}
                className={`px-3 py-1 rounded ${viewType === 'car' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
              >
                Car Number View
              </button>
            </div>
          </div>
        </div>

        {/* Table */}
        <table className="min-w-full mt-4 border">
          <thead>
            <tr>
              {viewType === 'item' ? (
                <>
                  <th className="border px-4 py-2">Item</th>
                  <th className="border px-4 py-2">Car Numbers</th>
                  <th className="border px-4 py-2">Total Quantity</th>
                  <th className="border px-4 py-2">Average Cost</th>
                  <th className="border px-4 py-2">Total Cost</th>
                  <th className="border px-4 py-2">Last Updated</th>
                </>
              ) : (
                <>
                  <th className="border px-4 py-2">Car Number</th>
                  <th className="border px-4 py-2">Item</th>
                  <th className="border px-4 py-2">Quantity</th>
                  <th className="border px-4 py-2">Unit Cost</th>
                  <th className="border px-4 py-2">Total Cost</th>
                  <th className="border px-4 py-2">Last Updated</th>
                </>
              )}
            </tr>
          </thead>
          <tbody>
            {stocks.data.map((stock) => (
              <tr key={stock.id || stock.item_id}>
                {viewType === 'item' ? (
                  <>
                    <td className="border px-4 py-2">{stock.item_name || stock.item?.name}</td>
                    <td className="border px-4 py-2">
                      {stock.car_numbers?.join(', ') || stock.car_number}
                    </td>
                    <td className="border px-4 py-2">{stock.total_quantity || stock.quantity}</td>
                    <td className="border px-4 py-2">
                      {stock.average_cost || stock.unit_cost}
                    </td>
                    <td className="border px-4 py-2">
                      {stock.total_cost || stock.total_cost}
                    </td>
                    <td className="border px-4 py-2">
                      {stock.last_updated
                        ? new Date(stock.last_updated).toLocaleDateString()
                        : stock.updated_at
                          ? new Date(stock.updated_at).toLocaleDateString()
                          : 'N/A'
                      }
                    </td>
                  </>
                ) : (
                  <>
                    <td className="border px-4 py-2">{stock.car_number}</td>
                    <td className="border px-4 py-2">{stock.item?.name}</td>
                    <td className="border px-4 py-2">{stock.quantity}</td>
                    <td className="border px-4 py-2">{stock.unit_cost}</td>
                    <td className="border px-4 py-2">{stock.total_cost}</td>
                    <td className="border px-4 py-2">
                      {stock.updated_at
                        ? new Date(stock.updated_at).toLocaleDateString()
                        : 'N/A'
                      }
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex justify-center mt-6 space-x-2">
          {stocks.links.map((link, index) => (
            <button
              key={index}
              onClick={() => {
                if (link.url) {
                  Inertia.get(link.url, { view_type: viewType });
                }
              }}
              disabled={!link.url}
              className={`px-3 py-1 rounded ${link.active ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            >
              {link.label.replace('&laquo;', '«').replace('&raquo;', '»')}
            </button>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default StockIndex;