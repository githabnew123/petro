import React from 'react';
import { Inertia } from '@inertiajs/inertia';
import { Link } from '@inertiajs/inertia-react';
import Layout from '../../Layouts/Layout';

const SaleIndex: React.FC<{ sales: any[] }> = ({ sales }) => {
    console.log(sales);
    return (
        <Layout selectedSection="Sale Summary">
            <div className="container mx-auto p-6">
                <h1 className="text-2xl font-bold mb-4">Sales</h1>
                <Link href="/sales/create" className="bg-blue-500 text-white px-4 py-2 rounded">Add Sale</Link>
                <table className="min-w-full mt-4 border border-gray-300">
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
                        {sales.map(sale => (
                            <tr key={sale.id}>
                                <td className="border px-4 py-2">{sale.customer?.name || 'N/A'}</td>
                                <td className="border px-4 py-2">{sale.item?.name || 'N/A'}</td>
                                <td className="border px-4 py-2">{sale.retail_price}</td>
                                <td className="border px-4 py-2">{sale.qty}</td>
                                <td className="border px-4 py-2">{sale.payment_method?.name || 'N/A'}</td>
                                <td className="border px-4 py-2">
                                    <Link href={`/sales/${sale.id}/edit`} className="text-blue-500">Edit</Link>
                                    <button onClick={() => {
                                        if (confirm('Are you sure you want to delete this sale?')) {
                                            Inertia.delete(`/sales/${sale.id}`);
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

export default SaleIndex;