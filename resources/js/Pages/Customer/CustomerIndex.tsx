// resources/js/Pages/CustomerIndex.tsx

import React from 'react';
import { Inertia } from '@inertiajs/inertia';
import { Link } from '@inertiajs/inertia-react';
import Layout from '../../Layouts/Layout';

const CustomerIndex: React.FC<{ customers: any[] }> = ({ customers }) => {
    return (
        <Layout selectedSection="Customer">
            <div>
                <h1 className="text-2xl font-bold">Customers</h1>
                <Link href="/customers/create" className="bg-blue-500 text-white px-4 py-2 rounded">Add Customer</Link>
                <table className="min-w-full mt-4">
                    <thead>
                        <tr>
                            <th className="border px-4 py-2">Name</th>
                            <th className="border px-4 py-2">Phone Number</th>
                            <th className="border px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {customers.map(customer => (
                            <tr key={customer.id}>
                                <td className="border px-4 py-2">{customer.name}</td>
                                <td className="border px-4 py- 2">{customer.phone_no}</td>
                                <td className="border px-4 py-2">
                                    <Link href={`/customers/${customer.id}/edit`} className="text-blue-500">Edit</Link>
                                    <button onClick={() => {
                                        if (confirm('Are you sure you want to delete this customer?')) {
                                            Inertia.delete(`/customers/${customer.id}`);
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

export default CustomerIndex;