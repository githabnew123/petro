import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { Link, usePage } from '@inertiajs/inertia-react';
import Layout from '../../Layouts/Layout';

interface Customer {
    id: number;
    name: string;
    phone_no: string;
}

interface CustomerPageProps {
    customers: {
        data: Customer[];
        links: any[];
        current_page: number;
        last_page: number;
    };
    filters: {
        search: string;
    };
}

const CustomerIndex: React.FC<CustomerPageProps> = ({ customers, filters }) => {
    const [search, setSearch] = useState(filters.search || '');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        Inertia.get('/customers', { search });
    };

    return (
        <Layout selectedSection="Customer">
            <div>
                <h1 className="text-2xl font-bold mb-4">Customers</h1>

                <div className="flex justify-between mb-4">
                    {/* Search Form */}
                    <form onSubmit={handleSearch} className="flex">
                        <input
                            type="text"
                            placeholder="Search by name or phone"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="border px-4 py-2 rounded-l"
                        />
                        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-r">
                            Search
                        </button>
                    </form>

                    {/* Add Customer Button */}
                    <Link href="/customers/create" className="bg-green-500 text-white px-4 py-2 rounded">
                        Add Customer
                    </Link>
                </div>

                {/* Customers Table */}
                <table className="min-w-full mt-4 border">
                    <thead>
                        <tr>
                            <th className="border px-4 py-2">Name</th>
                            <th className="border px-4 py-2">Phone Number</th>
                            <th className="border px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {customers.data.map(customer => (
                            <tr key={customer.id}>
                                <td className="border px-4 py-2">{customer.name}</td>
                                <td className="border px-4 py-2">{customer.phone_no}</td>
                                <td className="border px-4 py-2">
                                    <Link href={`/customers/${customer.id}/edit`} className="text-blue-500">
                                        Edit
                                    </Link>
                                    <button
                                        onClick={() => {
                                            if (confirm('Are you sure you want to delete this customer?')) {
                                                Inertia.delete(`/customers/${customer.id}`);
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
                    {customers.links.map((link, index) => (
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

export default CustomerIndex;
