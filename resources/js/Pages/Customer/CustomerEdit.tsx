// resources/js/Pages/CustomerEdit.tsx

import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import Layout from '../../Layouts/Layout';

const CustomerEdit: React.FC<{ customer: any }> = ({ customer }) => {
    const [customerName, setCustomerName] = useState(customer.name);
    const [phoneNo, setPhoneNo] = useState(customer.phone_no);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        Inertia.put(`/customers/${customer.id}`, {
            name: customerName,
            phone_no: phoneNo,
        });
    };

    return (
        <Layout selectedSection="Customer">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto">
                <h3 className="text-xl font-semibold mb-4">Edit Customer</h3>
                <div className="mb-4">
                    <label className="block text-gray-700">Customer Name</label>
                    <input
                        type="text"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        required
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Phone Number</label>
                    <input
                        type="text"
                        value={phoneNo}
                        onChange={(e) => setPhoneNo(e.target.value)}
                        required
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
                    />
                </div>
                <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition">
                    Update
                </button>
            </form>
        </Layout>
    );
};

export default CustomerEdit;