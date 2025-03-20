// resources/js/Pages/PaymentMethodCreate.tsx

import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import Layout from '../../Layouts/Layout';

const PaymentMethodCreate: React.FC = () => {
    const [name, setName] = useState('');
    const [owner, setOwner] = useState('');
    const [number, setNumber] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        Inertia.post('/payment-methods', {
            name,
            owner,
            number,
        });
    };

    return (
        <Layout selectedSection="Payment Method">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto">
                <h3 className="text-xl font-semibold mb-4">Add Payment Method</h3>
                <div className="mb-4">
                    <label className="block text-gray-700">Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Owner</label>
                    <input
                        type="text"
                        value={owner}
                        onChange={(e) => setOwner(e.target.value)}
                        required
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Number</label>
                    <input
                        type="text"
                        value={number}
                        onChange={(e) => setNumber(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
                    />
                </div>
                <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition">
                    Submit
                </button>
            </form>
        </Layout>
    );
};

export default PaymentMethodCreate;