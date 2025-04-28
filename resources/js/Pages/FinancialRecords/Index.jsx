import React from 'react';
import { Inertia } from '@inertiajs/inertia';
import Layout from '../../Layouts/Layout';

export default function FinancialRecordsIndex({ records, filters }) {
    return (
        <Layout selectedSection="Finance">
            <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-semibold">Financial Records</h2>
                    <a 
                        href={route('financial-records.create')} 
                        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                    >
                        Add New Record
                    </a>
                </div>

                <div className="mb-4 flex space-x-4">
                    <input
                        type="text"
                        placeholder="Search..."
                        className="p-2 border rounded"
                        value={filters.search}
                        onChange={(e) => Inertia.get(route('financial-records.index'), {
                            search: e.target.value,
                            type: filters.type
                        }, { preserveState: true })}
                    />
                    <select
                        className="p-2 border rounded"
                        value={filters.type}
                        onChange={(e) => Inertia.get(route('financial-records.index'), {
                            search: filters.search,
                            type: e.target.value
                        }, { preserveState: true })}
                    >
                        <option value="">All Types</option>
                        <option value="income">Income</option>
                        <option value="expense">Expense</option>
                    </select>
                </div>

                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="p-2 border">Date</th>
                            <th className="p-2 border">Type</th>
                            <th className="p-2 border">Category</th>
                            <th className="p-2 border">Amount</th>
                            <th className="p-2 border">Description</th>
                            <th className="p-2 border">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {records.data.map((record) => (
                            <tr key={record.id} className="border-b">
                                <td className="p-2 border">{record.date}</td>
                                <td className="p-2 border capitalize">{record.type}</td>
                                <td className="p-2 border">{record.category}</td>
                                <td className={`p-2 border text-right ${
                                    record.type === 'income' ? 'text-green-600' : 'text-red-600'
                                }`}>
                                    {record.amount.toFixed(2)}
                                </td>
                                <td className="p-2 border">{record.description}</td>
                                <td className="p-2 border">
                                    <div className="flex space-x-2">
                                        <a
                                            href={route('financial-records.edit', record.id)}
                                            className="text-blue-500 hover:text-blue-700"
                                        >
                                            Edit
                                        </a>
                                        <button
                                            onClick={() => {
                                                if (confirm('Are you sure you want to delete this record?')) {
                                                    Inertia.delete(route('financial-records.destroy', record.id));
                                                }
                                            }}
                                            className="text-red-500 hover:text-red-700"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className="mt-4">
                    {records.links && (
                        <div dangerouslySetInnerHTML={{ __html: records.links }} />
                    )}
                </div>
            </div>
        </Layout>
    );
}