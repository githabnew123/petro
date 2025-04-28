import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { Link } from '@inertiajs/inertia-react';
import Layout from '../../Layouts/Layout';

interface Sale {
    id: number;
    customer: {
        id: number;
        name: string;
    };
    item: {
        id: number;
        name: string;
    };
    retail_price: number;
    qty: number;
    payment_method: {
        id: number;
        name: string;
    };
}

interface SalePageProps {
    sales: {
        data: Sale[];
        links: any[];
        current_page: number;
        last_page: number;
    };
    filters: {
        search: string;
    };
}

const SaleIndex: React.FC<SalePageProps> = ({ sales, filters }) => {
    const [search, setSearch] = useState(filters.search || '');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        Inertia.get('/sales', { search });
    };

    return (
        <Layout selectedSection="Sale Summary">
            <div className="container mx-auto p-6">
                <h1 className="text-2xl font-bold mb-4">Sales</h1>

                {/* Search and Add Buttons */}
                <div className="flex justify-between mb-4">
                    <form onSubmit={handleSearch} className="flex">
                        <input
                            type="text"
                            placeholder="Search by customer or item"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="border px-4 py-2 rounded-l"
                        />
                        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-r">
                            Search
                        </button>
                    </form>

                    <Link href="/sales/create" className="bg-blue-500 text-white px-4 py-2 rounded">
                        Add Sale
                    </Link>
                </div>

                {/* Sales Table */}
                <table className="min-w-full mt-4 border">
                    <thead>
                        <tr>
                            <th className="border px-4 py-2">Customer</th>
                            <th className="border px-4 py-2">Item</th>
                            <th className="border px-4 py-2">Retail Price</th>
                            <th className="border px-4 py-2">Quantity</th>
                            <th className="border px-4 py-2">Payment Method</th>
                            <th className="border px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sales.data.map(sale => (
                            <tr key={sale.id}>
                                <td className="border px-4 py-2">{sale.customer?.name || 'N/A'}</td>
                                <td className="border px-4 py-2">{sale.item?.name || 'N/A'}</td>
                                <td className="border px-4 py-2">{sale.retail_price}</td>
                                <td className="border px-4 py-2">{sale.qty}</td>
                                <td className="border px-4 py-2">{sale.payment_method?.name || 'N/A'}</td>
                                <td className="border px-4 py-2">
                                    <Link href={`/sales/${sale.id}/edit`} className="text-blue-500">Edit</Link>
                                    <button
                                        onClick={() => {
                                            if (confirm('Are you sure you want to delete this sale?')) {
                                                Inertia.delete(`/sales/${sale.id}`);
                                            }
                                        }}
                                        className="text-red-500 ml-2"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Pagination */}
                <div className="flex justify-center mt-6 space-x-2">
                    {sales.links.map((link, index) => (
                        <button
                            key={index}
                            onClick={() => {
                                if (link.url) {
                                    Inertia.get(link.url);
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

export default SaleIndex;
