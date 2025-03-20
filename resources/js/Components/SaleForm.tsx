import React, { useState } from 'react';

const SaleForm: React.FC = () => {
    const [customerName, setCustomerName] = useState('');
    const [item, setItem] = useState('');
    const [rate, setRate] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log({ customerName, item, rate });
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto">
            <h3 className="text-xl font-semibold mb-4">Sale Form</h3>
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
                <label className="block text-gray-700">Item</label>
                <input
                    type="text"
                    value={item}
                    onChange={(e) => setItem(e.target.value)}
                    required
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Rate</label>
                <input
                    type="number"
                    value={rate}
                    onChange={(e) => setRate(e.target.value)}
                    required
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
                />
            </div>
            <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition">
                Confirm
            </button>
        </form>
    );
};

export default SaleForm;
