// resources/js/Pages/PaymentMethodShow.tsx

import React from 'react';
import { Link } from '@inertiajs/inertia-react';
import Layout from '../../Layouts/Layout';

const PaymentMethodShow: React.FC<{ paymentMethod: any }> = ({ paymentMethod }) => {
    return (
        <Layout selectedSection="Payment Method">
            <div className="p-6">
                <h1 className="text-2xl font-bold">Payment Method Details</h1>
                <div className="mt-4">
                    <p><strong>Name:</strong> {paymentMethod.name}</p>
                    <p><strong>Owner:</strong> {paymentMethod.owner}</p>
                    <p><strong>Number:</strong> {paymentMethod.number}</p>
                </div>
                <Link href="/payment-methods" className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded">Back to Payment Methods</Link>
            </div>
        </Layout>
    );
};

export default PaymentMethodShow;