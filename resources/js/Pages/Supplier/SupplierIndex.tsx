// resources/js/Pages/SupplierIndex.tsx

import React from 'react';
import { Inertia } from '@inertiajs/inertia';
import { Link } from '@inertiajs/inertia-react';
import Layout from '../../Layouts/Layout';

const SupplierIndex: React.FC<{ suppliers: any[] }> = ({ suppliers }) => {
    return (
        <Layout selectedSection="Supplier">
            <div>
                <h1 className="text-2xl font-bold">Suppliers</h1>
                <Link href="/suppliers/create" className="bg-blue-500 text-white px-4 py-2 rounded">Add Supplier</Link>
                <table className=" min-w-full mt-4">
                    <thead>
                        <tr>
                            <th className="border px-4 py-2">Name</th>
                            <th className="border px-4 py-2">Phone Number</th>
                            <th className="border px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {suppliers.map(supplier => (
                            <tr key={supplier.id}>
                                <td className="border px-4 py-2">{supplier.name}</td>
                                <td className="border px-4 py-2">{supplier.phone_no}</td>
                                <td className="border px-4 py-2">
                                    <Link href={`/suppliers/${supplier.id}/edit`} className="text-blue-500">Edit</Link>
                                    <button onClick={() => {
                                        if (confirm('Are you sure you want to delete this supplier?')) {
                                            Inertia.delete(`/suppliers/${supplier.id}`);
                                        }
                                    }} className="text-red-500 ml-2">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Layout>
    );
};

export default SupplierIndex;