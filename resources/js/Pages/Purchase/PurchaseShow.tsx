// resources/js/Pages/PurchaseShow.tsx

import React from 'react';
import { Link } from '@inertiajs/inertia-react';
import Layout from '../../Layouts/Layout';

const PurchaseShow: React.FC<{ purchase: any }> = ({ purchase }) => {
    return (
        <Layout selectedSection="Purchase">
            <div className="p-6">
                <h1 className="text-2xl font-bold">Purchase Details</h1>
                <div className="mt-4">
                    <p><strong>Supplier:</strong> {purchase.supplier.name}</p>
                    <p><strong>Date:</strong> {purchase.date}</p>
                    <p><strong>Car Number:</strong> {purchase.car_number}</p>
                    <p><strong>Quantity:</strong> {purchase.qty}</p>
                    <p><strong>Item:</strong> {purchase.item.name}</p>
                    <p><strong>Amount:</strong> {purchase.amount}</p>
                    <p><strong>Total:</strong> {purchase.total}</p>
                    <p><strong>Selling Price:</strong> {purchase.selling_price}</p>
                </div>
                <Link href="/purchases" className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded">Back to Purchases</Link>
            </div>
        </Layout>
    );
};

export default PurchaseShow;