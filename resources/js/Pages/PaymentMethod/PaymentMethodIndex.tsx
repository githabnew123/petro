// resources/js/Pages/PaymentMethodIndex.tsx

import React from 'react';
import { Inertia } from '@inertiajs/inertia';
import { Link } from '@inertiajs/inertia-react';
import Layout from '../../Layouts/Layout';

const PaymentMethodIndex: React.FC<{ paymentMethods: any[] }> = ({ paymentMethods }) => {
    return (
        <Layout selectedSection="Payment Method">
            <div>
                <h1 className="text-2xl font-bold">Payment Methods</h1>
                <Link href="/payment-methods/create" className="bg-blue-500 text-white px-4 py-2 rounded">Add Payment Method</Link>
                <table className="min-w-full mt-4">
                    <thead>
                        <tr>
                            <th className="border px-4 py-2">Name</th>
                            <th className="border px-4 py-2">Owner</th>
                            <th className="border px-4 py-2">Number</th>
                            <th className="border px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paymentMethods.map(paymentMethod => (
                            <tr key={paymentMethod.id}>
                                <td className="border px-4 py-2">{paymentMethod.name}</td>
                                <td className="border px-4 py-2">{paymentMethod.owner}</td>
                                <td className="border px-4 py-2">{paymentMethod.number}</td>
                                <td className="border px-4 py-2">
                                    <Link href={`/payment-methods/${paymentMethod.id}/edit`} className="text-blue-500">Edit</Link>
                                    <button onClick={() => {
                                        if (confirm('Are you sure you want to delete this payment method?')) {
                                            Inertia.delete(`/payment-methods/${paymentMethod.id}`);
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

export default PaymentMethodIndex;