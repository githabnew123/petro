// resources/js/Pages/PurchaseIndex.tsx

import React from 'react';
import { Inertia } from '@inertiajs/inertia';
import { Link } from '@inertiajs/inertia-react';
import Layout from '../../Layouts/Layout';

const PurchaseIndex: React.FC<{ purchases: any[] }> = ({ purchases }) => {
    return (
        <Layout selectedSection="Purchase">
            <div>
                <h1 className="text-2xl font-bold">Purchases</h1>
                <Link href="/purchases/create" className="bg-blue-500 text-white px-4 py-2 rounded">Add Purchase</Link>
                <table className="min-w-full mt-4">
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
                        {purchases.map(purchase => (
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
                                    <button onClick={() => {
                                        if (confirm('Are you sure you want to delete this purchase?')) {
                                            Inertia.delete(`/purchases/${purchase.id}`);
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

export default PurchaseIndex;