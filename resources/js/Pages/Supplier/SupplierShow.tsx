// resources/js/Pages/SupplierShow.tsx

import React from 'react';
import { Link } from '@inertiajs/inertia-react';
import Layout from '../../Layouts/Layout';

const SupplierShow: React.FC<{ supplier: any }> = ({ supplier }) => {
    return (
        <Layout selectedSection="Supplier">
            <div className="p-6">
                <h1 className="text-2xl font-bold">Supplier Details</h1>
                <div className="mt-4">
                    <p><strong>Name:</strong> {supplier.name}</p>
                    <p><strong>Phone Number:</strong> {supplier.phone_no}</p>
                </div>
                <Link href="/suppliers" className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded">Back to Suppliers</Link>
            </div>
        </Layout>
    );
};

export default SupplierShow;