// resources/js/Pages/ItemIndex.tsx

import React from 'react';
import { Inertia } from '@inertiajs/inertia';
import { Link } from '@inertiajs/inertia-react';
import Layout from '../../Layouts/Layout';

const ItemIndex: React.FC<{ items: any[] }> = ({ items }) => {
    return (
        <Layout selectedSection="Item">
        <div>
            <h1 className="text-2xl font-bold">Items</h1>
            <Link href="/items/create" className="bg-blue-500 text-white px-4 py-2 rounded">Add Item</Link>
            <table className="min-w-full mt-4">
                <thead>
                    <tr>
                        <th className="border px-4 py-2">Name</th>
                        <th className="border px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map(item => (
                        <tr key={item.id}>
                            <td className="border px-4 py-2">{item .name}</td>
                            <td className="border px-4 py-2">
                                <Link href={`/items/${item.id}/edit`} className="text-blue-500">Edit</Link>
                                <button onClick={() => {
                                    if (confirm('Are you sure you want to delete this item?')) {
                                        Inertia.delete(`/items/${item.id}`);
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

export default ItemIndex;