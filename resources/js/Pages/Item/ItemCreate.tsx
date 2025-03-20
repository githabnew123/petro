// resources/js/Pages/ItemCreate.tsx

import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import Layout from '../../Layouts/Layout';

const ItemCreate: React.FC = () => {
    const [itemName, setItemName] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        Inertia.post('/items', {
            name: itemName,
        });
    };

    return (
        <Layout selectedSection="Item">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto">
                <h3 className="text-xl font-semibold mb-4">Add Item</h3>
                <div className="mb-4">
                    <label className="block text-gray-700">Item Name</label>
                    <input
                        type="text"
                        value={itemName}
                        onChange={(e) => setItemName(e.target.value)}
                        required
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

export default ItemCreate;