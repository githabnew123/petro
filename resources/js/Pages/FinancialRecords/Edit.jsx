import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import Layout from '../../Layouts/Layout';

export default function FinancialRecordsEdit({ record }) {
    const [form, setForm] = useState({
        type: record.type,
        amount: record.amount,
        category: record.category,
        description: record.description,
        date: record.date,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        Inertia.put(route('financial-records.update', record.id), form);
    };

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <Layout selectedSection="Finance">
            <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto">
                <h2 className="text-2xl font-semibold mb-6">Edit Financial Record</h2>
                
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                            <label className="block text-gray-700 mb-2">Type</label>
                            <select
                                name="type"
                                value={form.type}
                                onChange={handleChange}
                                className="w-full p-2 border rounded"
                                required
                            >
                                <option value="income">Income</option>
                                <option value="expense">Expense</option>
                            </select>
                        </div>
                        
                        <div>
                            <label className="block text-gray-700 mb-2">Date</label>
                            <input
                                type="date"
                                name="date"
                                value={form.date}
                                onChange={handleChange}
                                className="w-full p-2 border rounded"
                                required
                            />
                        </div>
                        
                        <div>
                            <label className="block text-gray-700 mb-2">Amount</label>
                            <input
                                type="number"
                                name="amount"
                                value={form.amount}
                                onChange={handleChange}
                                className="w-full p-2 border rounded"
                                required
                                min="0"
                                step="0.01"
                            />
                        </div>
                        
                        <div>
                            <label className="block text-gray-700 mb-2">Category</label>
                            <input
                                type="text"
                                name="category"
                                value={form.category}
                                onChange={handleChange}
                                className="w-full p-2 border rounded"
                                required
                            />
                        </div>
                    </div>
                    
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Description</label>
                        <textarea
                            name="description"
                            value={form.description}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                            rows="3"
                        />
                    </div>
                    
                    <div className="flex justify-end space-x-4">
                        <a
                            href={route('financial-records.index')}
                            className="bg-gray-300 text-gray-700 py-2 px-6 rounded hover:bg-gray-400"
                        >
                            Cancel
                        </a>
                        <button
                            type="submit"
                            className="bg-blue-500 text-white py-2 px-6 rounded hover:bg-blue-600"
                        >
                            Update Record
                        </button>
                    </div>
                </form>
            </div>
        </Layout>
    );
}