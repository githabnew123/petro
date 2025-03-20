// resources/js/Pages/CustomerShow.tsx

import React from 'react';
import { Link } from '@inertiajs/inertia-react';
import Layout from '../../Layouts/Layout';

const CustomerShow: React.FC<{ customer: any }> = ({ customer }) => {
    return (
        <Layout selectedSection="Customer">
            <div className="p-6">
                <h1 className="text-2xl font-bold">Customer Details</h1>
                <div className="mt-4">
                    <p><strong>Name:</strong> {customer.name}</p>
                    <p><strong>Phone Number:</strong> {customer.phone_no}</p>
                </div>
                <Link href="/customers" className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded">Back to Customers</Link>
            </div>
        </Layout>
    );
};

export default CustomerShow;