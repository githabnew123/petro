import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { Link } from '@inertiajs/inertia-react';
import Layout from '../../Layouts/Layout';

interface Purchase {
    id: number;
    supplier: {
        id: number;
        name: string;
    };
    item: {
        id: number;
        name: string;
    };
    date: string;
    car_number: string;
    qty: number;
    amount: number;
    total: number;
    selling_price: number;
}

interface PurchasePageProps {
    purchases: {
        data: Purchase[];
        links: any[];
        current_page: number;
        last_page: number;
    };
    filters: {
        search: string;
    };
}

const PurchaseIndex: React.FC<PurchasePageProps> = ({ purchases, filters }) => {
    const [search, setSearch] = useState(filters.search || '');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        Inertia.get('/purchases', { search });
    };

    return (
        <Layout selectedSection="Purchase">
            <div>
                <h1 className="text-2xl font-bold mb-4">Purchases</h1>

                <div className="flex justify-between mb-4">
                    {/* Search */}
                    <form onSubmit={handleSearch} className="flex">
                        <input
                            type="text"
                            placeholder="Search by supplier or car number"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="border px-4 py-2 rounded-l"
                        />
                        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-r">
                            Search
                        </button>
                    </form>

                    {/* Add Button */}
                    <Link href="/purchases/create" className="bg-green-500 text-white px-4 py-2 rounded">
                        Add Purchase
                    </Link>
                </div>

                {/* Table */}
                <table className="min-w-full mt-4 border">
                    <thead>
                        <tr>
                            <th className="border px-4 py-2">Supplier</th>
                            <th className="border px-4 py-2">Date</th>
                            <th className="border px-4 py-2">Car Number</th>
                            <th className="border px-4 py-2">Quantity</th>
                            <th className="border px-4 py-2">Item</th>
                            <th className="border px-4 py-2">Amount</th>
                            <th className="border px-4 py-2">Total</th>
                            <th className="border px-4 py-2">Selling Price</th>
                            <th className="border px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {purchases.data.map(purchase => (
                            <tr key={purchase.id}>
                                <td className="border px-4 py-2">{purchase.supplier.name}</td>
                                <td className="border px-4 py-2">{purchase.date}</td>
                                <td className="border px-4 py-2">{purchase.car_number}</td>
                                <td className="border px-4 py-2">{purchase.qty}</td>
                                <td className="border px-4 py-2">{purchase.item.name}</td>
                                <td className="border px-4 py-2">{purchase.amount}</td>
                                <td className="border px-4 py-2">{purchase.total}</td>
                                <td className="border px-4 py-2">{purchase.selling_price}</td>
                                <td className="border px-4 py-2">
                                    <Link href={`/purchases/${purchase.id}/edit`} className="text-blue-500">Edit</Link>
                                    <button
                                        onClick={() => {
                                            if (confirm('Are you sure you want to delete this purchase?')) {
                                                Inertia.delete(`/purchases/${purchase.id}`);
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
                    {purchases.links.map((link, index) => (
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

export default PurchaseIndex;
