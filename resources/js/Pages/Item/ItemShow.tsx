// resources/js/Pages/ItemShow.tsx

import React from 'react';
import { Link } from '@inertiajs/inertia-react';
import Layout from '../../Layouts/Layout';

const ItemShow: React.FC<{ item: any }> = ({ item }) => {
    return (
        <Layout selectedSection="Item">
            <div className="p-6">
                <h1 className="text-2xl font-bold">Item Details</h1>
                <div className="mt-4">
                    <p><strong>Name:</strong> {item.name}</p>
                </div>
                <Link href="/items" className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded">Back to Items</Link>
            </div>
        </Layout>
    );
};

export default ItemShow;