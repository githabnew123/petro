import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { Link } from '@inertiajs/inertia-react';
import Layout from '../../Layouts/Layout';

interface PaymentMethod {
    id: number;
    name: string;
    owner: string;
    number: string;
}

interface PaymentMethodPageProps {
    paymentMethods: {
        data: PaymentMethod[];
        links: any[];
        current_page: number;
        last_page: number;
    };
    filters: {
        search: string;
    };
}

const PaymentMethodIndex: React.FC<PaymentMethodPageProps> = ({ paymentMethods, filters }) => {
    const [search, setSearch] = useState(filters.search || '');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        Inertia.get('/payment-methods', { search });
    };

    return (
        <Layout selectedSection="Payment Method">
            <div>
                <h1 className="text-2xl font-bold mb-4">Payment Methods</h1>

                <div className="flex justify-between mb-4">
                    {/* Search */}
                    <form onSubmit={handleSearch} className="flex">
                        <input
                            type="text"
                            placeholder="Search by name"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="border px-4 py-2 rounded-l"
                        />
                        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-r">
                            Search
                        </button>
                    </form>

                    {/* Add Button */}
                    <Link href="/payment-methods/create" className="bg-green-500 text-white px-4 py-2 rounded">
                        Add Payment Method
                    </Link>
                </div>

                {/* Table */}
                <table className="min-w-full mt-4 border">
                    <thead>
                        <tr>
                            <th className="border px-4 py-2">Name</th>
                            <th className="border px-4 py-2">Owner</th>
                            <th className="border px-4 py-2">Number</th>
                            <th className="border px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paymentMethods.data.map(paymentMethod => (
                            <tr key={paymentMethod.id}>
                                <td className="border px-4 py-2">{paymentMethod.name}</td>
                                <td className="border px-4 py-2">{paymentMethod.owner}</td>
                                <td className="border px-4 py-2">{paymentMethod.number}</td>
                                <td className="border px-4 py-2">
                                    <Link href={`/payment-methods/${paymentMethod.id}/edit`} className="text-blue-500">
                                        Edit
                                    </Link>
                                    <button
                                        onClick={() => {
                                            if (confirm('Are you sure you want to delete this payment method?')) {
                                                Inertia.delete(`/payment-methods/${paymentMethod.id}`);
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
                    {paymentMethods.links.map((link, index) => (
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

export default PaymentMethodIndex;
