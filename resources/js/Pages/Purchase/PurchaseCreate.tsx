// resources/js/Pages/PurchaseCreate.tsx

import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import Layout from '../../Layouts/Layout';

const PurchaseCreate: React.FC<{ suppliers: any[], items: any[] }> = ({ suppliers, items }) => {
    const [supplierId, setSupplierId] = useState('');
    const [date, setDate] = useState('');
    const [carNumber, setCarNumber] = useState('');
    const [qty, setQty] = useState(1);
    const [itemId, setItemId] = useState('');
    const [amount, setAmount] = useState(0);
    const [sellingPrice, setSellingPrice] = useState(0);
    const [total, setTotal] = useState(0);
    const [error, setError] = useState('');

    const handleQtyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const quantity = parseInt(e.target.value);
        setQty(quantity);
        setTotal(quantity * amount);
    };

    const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const amt = parseFloat(e.target.value);
        setAmount(amt);
        setTotal(qty * amt);
    };

    const validateCarNumber = (value: string) => {
        // Regex to match the format: CODE-NUMBER or CODE-ALPHANUMERIC
        const regex = /^(AYY|BGO|CHN|KYH|KCN|KYN|MGY|MDY|MON|NPW|RKE|SGG|SHN|TNI|YGN)-(\d{1,2} \d[A-Z]-\d{1,4})$/;
        return regex.test(value);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateCarNumber(carNumber)) {
            setError('Car number must be in the format: CODE-NUMBER (e.g., AYY-5 7A-2222)');
            return;
        }
        setError('');
        Inertia.post('/purchases', {
            supplier_id: supplierId,
            date,
            car_number: carNumber,
            qty,
            item_id: itemId,
            amount,
            total,
            selling_price: sellingPrice,
        });
    };

    return (
        <Layout selectedSection="Purchase">
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md max-w-3xl mx-auto grid grid-cols-2 gap-4">
            <h3 className="text-xl font-semibold mb-4 col-span-2">Add Purchase</h3>
            <div className="mb-4 col-span-2">
                <label className="block text-gray-700">Supplier</label>
                <select
                    value={supplierId}
                    onChange={(e) => setSupplierId(e.target.value)}
                    required
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
                >
                    <option value="">Select Supplier</option>
                    {suppliers.map(supplier => (
                        <option key={supplier.id} value={supplier.id}>{supplier.name}</option>
                    ))}
                </select>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Date</label>
                <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Car Number</label>
                <input
                    type="text"
                    value={carNumber}
                    onChange={(e) => setCarNumber(e.target.value)}
                    required
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
                />
                {error && <p className="text-red-500 text-sm">{error}</p>}
            </div>
            < div className="mb-4">
                <label className="block text-gray-700">Item</label>
                <select
                    value={itemId}
                    onChange={(e) => setItemId(e.target.value)}
                    required
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
                >
                    <option value="">Select Item</option>
                    {items.map(item => (
                        <option key={item.id} value={item.id}>{item.name}</option>
                    ))}
                </select>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Quantity</label>
                <input
                    type="number"
                    value={qty}
                    onChange={handleQtyChange}
                    min="1"
                    required
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
                />
            </div>            
            <div className="mb-4">
                <label className="block text-gray-700">Amount</label>
                <input
                    type="number"
                    value={amount}
                    onChange={handleAmountChange}
                    min="0"
                    required
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Total</label>
                <input
                    type="number"
                    value={total}
                    readOnly
                    className="w-full p-2 border border-gray-300 rounded-md bg-gray-200"
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Selling Price</label>
                <input
                    type="number"
                    value={sellingPrice}
                    onChange={(e) => setSellingPrice(parseFloat(e.target.value))}
                    min="0"
                    required
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
                />
            </div>
            <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition col-span-2">
                Submit
            </button>
        </form>
        </Layout>
    );
};

export default PurchaseCreate;