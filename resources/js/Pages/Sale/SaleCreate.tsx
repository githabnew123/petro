import React, { useState, useEffect } from 'react';
import { Inertia } from '@inertiajs/inertia';
import Layout from '../../Layouts/Layout';

interface SaleFormProps {
    customers: any[]; // Array of customers
    items: any[]; // Array of items
    paymentMethods: any[]; // Array of payment methods
}

const SaleCreate: React.FC<SaleFormProps> = ({ customers = [], items = [], paymentMethods = [] }) => {
    const [customerId, setCustomerId] = useState('');
    const [itemId, setItemId] = useState('');
    const [retailPrice, setRetailPrice] = useState(0);
    const [qty, setQty] = useState(1);
    const [paymentMethodId, setPaymentMethodId] = useState('');
    const [carNumber, setCarNumber] = useState('');
    const [payment, setPayment] = useState(0);
    const [transferAccount, setTransferAccount] = useState('');
    const [carrierNumber, setCarrierNumber] = useState('');
    const [error, setError] = useState('');
    const [total, setTotal] = useState(0);
    const [balance, setBalance] = useState(0);
    
    useEffect(() => {
        const calculatedTotal = retailPrice * qty;
        setTotal(calculatedTotal);
        setBalance(calculatedTotal - payment);
    }, [retailPrice, qty, payment]);
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Validate car number format
        const validateCarNumber = (value: string) => {
            const regex = /^(AYY|BGO|CHN|KYH|KCN|KYN|MGY|MDY|MON|NPW|RKE|SGG|SHN|TNI|YGN)-(\d{1,2} \d[A-Z]-\d{1,4})$/;
            return regex.test(value);
        };

        if (!validateCarNumber(carNumber)) {
            setError('Car number must be in the format: CODE-NUMBER (e.g., AYY-5 7A-2222)');
            return;
        }

        setError('');

        // Submit the form data
        Inertia.post('/sales', {
            customer: customerId,
            item: itemId,
            retail_price: retailPrice,
            qty,
            total,
            payment_method: paymentMethodId,
            car_number: carNumber,
            payment,
            transfer_account: transferAccount,
            carrier_number: carrierNumber,
            balance,
        });
    };

    return (
        <Layout selectedSection="Sale">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md max-w-3xl mx-auto grid grid-cols-2 gap-4">
                <h3 className="text-2xl font-semibold mb-4 col-span-2 text-center">Sale Form</h3>
                {error && <p className="text-red-500 mb-4 col-span-2">{error}</p>}
                
                <div className="mb-4 col-span-1">
                    <label className="block text-gray-700">Customer</label>
                    <select
                        value={customerId}
                        onChange={(e) => setCustomerId(e.target.value)}
                        required
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
                    >
                        <option value="">Select Customer</option>
                        {customers.map(customer => (
                            <option key={customer.id} value={customer.id}>{customer.name}</option>
                        ))}
                    </select>
                </div>
                
                <div className="mb-4 col-span-1">
                    <label className="block text-gray-700">Item</label>
                    <select
                        value={itemId}
                        onChange={(e) => setItemId(e.target.value)}
                        required
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
                    >
                        <option value="">Select Item</ option>
                        {items.map(item => (
                            <option key={item.id} value={item.id}>{item.name}</option>
                        ))}
                    </select>
                </div>
                
                <div className="mb-4 col-span-1">
                    <label className="block text-gray-700">Retail Price</label>
                    <input
                        type="number"
                        value={retailPrice}
                        onChange={(e) => setRetailPrice(parseFloat(e.target.value))}
                        required
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
                    />
                </div>
                
                <div className="mb-4 col-span-1">
                    <label className="block text-gray-700">Quantity</label>
                    <input
                        type="number"
                        value={qty}
                        onChange={(e) => setQty(parseInt(e.target.value))}
                        min="1"
                        required
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
                    />
                </div>
                
                <div className="mb-4 col-span-1">
                    <label className="block text-gray-700">Total</label>
                    <input
                        type="number"
                        value={total}
                        readOnly
                        className="w-full p-2 border border-gray-300 rounded-md bg-gray-100"
                    />
                </div>
                
                <div className="mb-4 col-span-1">
                    <label className="block text-gray-700">Payment</label>
                    <input
                        type="number"
                        value={payment}
                        onChange={(e) => setPayment(parseFloat(e.target.value))}
                        required
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
                    />
                </div>
                
                <div className="mb-4 col-span-1">
                    <label className="block text-gray-700">Balance</label>
                    <input
                        type="number"
                        value={balance}
                        readOnly
                        className="w-full p-2 border border-gray-300 rounded-md bg-gray-100"
                    />
                </div>
                
                <div className="mb-4 col-span-1">
                    <label className="block text-gray-700">Payment Method</label>
                    <select
                        value={paymentMethodId}
                        onChange={(e) => setPaymentMethodId(e.target.value)}
                        required
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
                    >
                        <option value="">Select Payment Method</option>
                        {paymentMethods.map(method => (
                            <option key={method.id} value={method.id}>{method.name}</option>
                        ))}
                    </select>
                </div>
                
                <div className="mb-4 col-span-1">
                    <label className="block text-gray-700">Car Number</label>
                    <input
                        type="text"
                        value={carNumber}
                        onChange={(e) => setCarNumber(e.target.value)}
                        required
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
                    />
                </div>
                
                <div className="mb-4 col-span-1">
                    <label className="block text-gray-700">Transfer Account</label>
                    <input
                        type="text"
                        value={transferAccount}
                        onChange={(e) => setTransferAccount(e.target.value)}
                        required
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
                    />
                </div>
                
                <div className="mb-4 col-span-1">
                    <label className="block text-gray-700">Carrier Number</label>
                    <input
                        type="text"
                        value={carrierNumber}
                        onChange={(e) => setCarrierNumber(e.target.value)}
                        required
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
                    />
                </div>
                
                <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition col-span-2">
                    Confirm Sale
                </button>
            </form>
        </Layout>
    );
};

export default SaleCreate;