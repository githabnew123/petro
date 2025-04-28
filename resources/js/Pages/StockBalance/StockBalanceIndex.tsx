import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { Link } from '@inertiajs/inertia-react';
import Layout from '../../Layouts/Layout';

interface StockBalanceItem {
  issue_quantity: ReactNode;
  id?: number;
  item_id?: number;
  item_name?: string;
  car_number?: string;
  car_numbers?: string;
  quantity?: number;
  total_quantity?: number;
  updated_at?: string;
  last_updated?: string;
  item?: {
    id: number;
    name: string;
  };
  view_type?: string;
}

interface StockBalancePageProps {
  stockBalances: {
    data: StockBalanceItem[];
    links: any[];
    current_page: number;
    last_page: number;
  };
  filters: {
    search: string;
    view_type: string;
  };
}

const StockBalanceIndex: React.FC<StockBalancePageProps> = ({ stockBalances, filters }) => {
  const [search, setSearch] = useState(filters.search || '');
  const [viewType, setViewType] = useState(filters.view_type || 'item');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    Inertia.get('/stockbalances', { search, view_type: viewType });
  };

  const handleViewTypeChange = (type: string) => {
    setViewType(type);
    Inertia.get('/stockbalances', { search, view_type: type });
  };console.log(stockBalances.data);

  return (
    <Layout selectedSection="Stock Balance">
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold mb-6">Stock Balance</h1>

        <div className="flex flex-col md:flex-row justify-between mb-6 gap-4">
          <div className="flex flex-col md:flex-row gap-4">
            <form onSubmit={handleSearch} className="flex">
              <input
                type="text"
                placeholder={`Search by ${viewType === 'item' ? 'item' : 'item or car number'}`}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="border px-4 py-2 rounded-l focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-r transition-colors"
              >
                Search
              </button>
            </form>

            <div className="flex gap-2">
              <button
                onClick={() => handleViewTypeChange('item')}
                className={`px-4 py-2 rounded transition-colors ${viewType === 'item' ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'
                  }`}
              >
                Item View
              </button>
              <button
                onClick={() => handleViewTypeChange('car')}
                className={`px-4 py-2 rounded transition-colors ${viewType === 'car' ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'
                  }`}
              >
                Car Number View
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {viewType === 'item' ? (
                    <>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Car Numbers</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Issued</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Updated</th>
                    </>
                  ) : (
                    <>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Car Number</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Issued Quantity</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    </>
                  )}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {stockBalances.data.map((stock) => (
                  <tr key={stock.id || stock.item_id} className="hover:bg-gray-50">
                    {viewType === 'item' ? (
                      <>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="font-medium text-gray-900">{stock.item_name || stock.item?.name}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                          {stock.car_numbers || stock.car_number}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                          {stock.total_quantity || stock.quantity}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                          {new Date(stock.last_updated || stock.updated_at).toLocaleDateString()}
                        </td>
                      </>
                    ) : (
                      <>
                        <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                          {stock.car_number}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                          {stock.item?.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                          {stock.issue_quantity}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                          {new Date(stock.updated_at).toLocaleDateString()}
                        </td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-6 space-x-1">
          {stockBalances.links.map((link, index) => (
            <button
              key={index}
              onClick={() => {
                if (link.url) {
                  Inertia.get(link.url, { view_type: viewType, search });
                }
              }}
              disabled={!link.url}
              className={`px-4 py-2 rounded-md ${link.active
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                } ${!link.url ? 'opacity-50 cursor-not-allowed' : ''}`}
              dangerouslySetInnerHTML={{ __html: link.label }}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default StockBalanceIndex;