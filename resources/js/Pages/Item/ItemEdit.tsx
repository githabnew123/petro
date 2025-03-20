// resources/js/Pages/ItemEdit.tsx

import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import Layout from '../../Layouts/Layout';

const ItemEdit: React.FC<{ item: any }> = ({ item }) => {
    const [itemName, setItemName] = useState(item.name);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        Inertia.put(`/items/${item.id}`, {
            name: itemName,
        });
    };

    return (
        <Layout selectedSection="Item">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto">
                <h3 className="text-xl font-semibold mb-4">Edit Item</h3>
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
                    Update
                </button>
            </form>
        </Layout>
    );
};

export default ItemEdit;