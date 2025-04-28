import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { Link, usePage } from '@inertiajs/inertia-react';
import Layout from '../../Layouts/Layout';

interface Supplier {
    id: number;
    name: string;
    phone_no: string;
}

interface SupplierPageProps {
    suppliers: {
        data: Supplier[];
        links: any[];
        current_page: number;
        last_page: number;
    };
    filters: {
        search: string;
    };
}

const SupplierIndex: React.FC<SupplierPageProps> = ({ suppliers, filters }) => {
    const [search, setSearch] = useState(filters.search || '');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        Inertia.get('/suppliers', { search });
    };

    return (
        <Layout selectedSection="Supplier">
            <div>
                <h1 className="text-2xl font-bold mb-4">Suppliers</h1>

                <div className="flex justify-between mb-4">
                    <form onSubmit={handleSearch} className="flex">
                        <input
                            type="text"
                            placeholder="Search by name or phone"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="border px-4 py-2 rounded-l"
                        />
                        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-r">Search</button>
                    </form>

                    <Link href="/suppliers/create" className="bg-green-500 text-white px-4 py-2 rounded">
                        Add Supplier
                    </Link>
                </div>

                <table className="min-w-full mt-4 border">
                    <thead>
                        <tr>
                            <th className="border px-4 py-2">Name</th>
                            <th className="border px-4 py-2">Phone Number</th>
                            <th className="border px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {suppliers.data.map(supplier => (
                            <tr key={supplier.id}>
                                <td className="border px-4 py-2">{supplier.name}</td>
                                <td className="border px-4 py-2">{supplier.phone_no}</td>
                                <td className="border px-4 py-2">
                                    <Link href={`/suppliers/${supplier.id}/edit`} className="text-blue-500">Edit</Link>
                                    <button
                                        onClick={() => {
                                            if (confirm('Are you sure you want to delete this supplier?')) {
                                                Inertia.delete(`/suppliers/${supplier.id}`);
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
                    {suppliers.links.map((link, index) => (
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

export default SupplierIndex;
