import React, { useState, useEffect } from 'react';
import { Inertia } from '@inertiajs/inertia';
import Layout from '../../Layouts/Layout';

interface Customer {
    id: number;
    name: string;
}

interface Item {
    id: number;
    name: string;
    price: number;
}

interface PaymentMethod {
    id: number;
    name: string;
}

interface Sale {
    id: number;
    customer: Customer;
    item: Item;
    retail_price: number;
    qty: number;
    payment_method: PaymentMethod;
    car_number: string;
    payment: number;
    transfer_account: string;
    carrier_number: string;
    total: number;
    balance: number;
}

interface Props {
    sale: Sale;
    customers: Customer[];
    items: Item[];
    paymentMethods: PaymentMethod[];
}

const SaleEdit: React.FC<Props> = ({ sale, customers, items, paymentMethods }) => {
    const [customerId, setCustomerId] = useState(sale.customer.id);
    const [itemId, setItemId] = useState(sale.item.id);
    const [retailPrice, setRetailPrice] = useState(sale.retail_price);
    const [qty, setQty] = useState(sale.qty);
    const [paymentMethodId, setPaymentMethodId] = useState(sale.payment_method.id);
    const [carNumber, setCarNumber] = useState(sale.car_number);
    const [payment, setPayment] = useState(sale.payment);
    const [transferAccount, setTransferAccount] = useState(sale.transfer_account);
    const [carrierNumber, setCarrierNumber] = useState(sale.carrier_number);
    const [error, setError] = useState('');
    const [total, setTotal] = useState<number>(sale.total || 0);
    const [balance, setBalance] = useState<number>(sale.balance || 0);

    useEffect(() => {
        const calculatedTotal = retailPrice * qty;
        setTotal(calculatedTotal);
        setBalance(calculatedTotal - payment);
    }, [retailPrice, qty, payment]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const validateCarNumber = (value: string) => {
            const regex = /(\d{1,2}[A-Z]-\d{1,4})$/;
            return regex.test(value);
        };

        if (!validateCarNumber(carNumber)) {
            setError('Car number must be in the format: CODE-NUMBER (e.g., AYY-5 7A-2222)');
            return;
        }

        setError('');

        Inertia.put(`/sales/${sale.id}`, {
            customer: customerId,
            item: itemId,
            retail_price: retailPrice,
            qty,
            payment_method: paymentMethodId,
            car_number: carNumber,
            payment,
            transfer_account: transferAccount,
            carrier_number: carrierNumber,
            total,
            balance,
        });
    };

    return (
        <Layout selectedSection="Sale">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md max-w-3xl mx-auto grid grid-cols-2 gap-4">
                <h3 className="text-2xl font-semibold mb-4 col-span-2 text-center">Edit Sale</h3>
                {error && <p className="text-red-500 mb-4 col-span-2">{error}</p>}

                {/* Customer */}
                <div className="col-span-1">
                    <label className="block text-gray-700">Customer</label>
                    <select
                        value={customerId}
                        onChange={(e) => setCustomerId(Number(e.target.value))}
                        required
                        className="w-full p-2 border rounded-md focus:ring focus:ring-blue-200"
                    >
                        {customers.map(customer => (
                            <option key={customer.id} value={customer.id}>{customer.name}</option>
                        ))}
                    </select>
                </div>

                {/* Item */}
                <div className="col-span-1">
                    <label className="block text-gray-700">Item</label>
                    <select
                        value={itemId}
                        onChange={(e) => {
                            const selectedItemId = Number(e.target.value);
                            setItemId(selectedItemId);
                            const item = items.find(i => i.id === selectedItemId);
                            setRetailPrice(item ? item.price : 0);
                        }}
                        required
                        className="w-full p-2 border rounded-md focus:ring focus:ring-blue-200"
                    >
                        {items.map(item => (
                            <option key={item.id} value={item.id}>{item.name}</option>
                        ))}
                    </select>
                </div>

                {/* Retail Price */}
                <div className="col-span-1">
                    <label className="block text-gray-700">Retail Price</label>
                    <input
                        type="number"
                        value={retailPrice}
                        onChange={(e) => setRetailPrice(parseFloat(e.target.value) || 0)}
                        required
                        className="w-full p-2 border rounded-md focus:ring focus:ring-blue-200"
                    />
                </div>

                {/* Quantity */}
                <div className="col-span-1">
                    <label className="block text-gray-700">Quantity</label>
                    <input
                        type="number"
                        value={qty}
                        min={1}
                        onChange={(e) => setQty(Math.max(1, parseInt(e.target.value) || 1))}
                        required
                        className="w-full p-2 border rounded-md focus:ring focus:ring-blue-200"
                    />
                </div>

                {/* Total */}
                <div className="col-span-1">
                    <label className="block text-gray-700">Total</label>
                    <input
                        type="number"
                        value={typeof total === 'number' ? total.toFixed(2) : '0.00'}
                        readOnly
                        className="w-full p-2 border bg-gray-100 rounded-md"
                    />
                </div>

                {/* Payment */}
                <div className="col-span-1">
                    <label className="block text-gray-700">Payment</label>
                    <input
                        type="number"
                        value={payment}
                        min={0}
                        onChange={(e) => setPayment(parseFloat(e.target.value) || 0)}
                        required
                        className="w-full p-2 border rounded-md focus:ring focus:ring-blue-200"
                    />
                </div>

                {/* Balance */}
                <div className="col-span-1">
                    <label className="block text-gray-700">Credit Amount</label>
                    <input
                        type="number"
                        value={typeof balance === 'number' ? balance.toFixed(2) : '0.00'}
                        readOnly
                        className="w-full p-2 border bg-gray-100 rounded-md"
                    />
                </div>

                {/* Payment Method */}
                <div className="col-span-1">
                    <label className="block text-gray-700">Payment Method</label>
                    <select
                        value={paymentMethodId}
                        onChange={(e) => setPaymentMethodId(Number(e.target.value))}
                        required
                        className="w-full p-2 border rounded-md focus:ring focus:ring-blue-200"
                    >
                        {paymentMethods.map(method => (
                            <option key={method.id} value={method.id}>{method.name}</option>
                        ))}
                    </select>
                </div>

                {/* Car Number */}
                <div className="col-span-2">
                    <label className="block text-gray-700">Car Number</label>
                    <input
                        type="text"
                        value={carNumber}
                        onChange={(e) => setCarNumber(e.target.value)}
                        required
                        className="w-full p-2 border rounded-md focus:ring focus:ring-blue-200"
                        placeholder="e.g., AYY-5 7A-2222"
                    />
                </div>

                {/* Transfer Account */}
                <div className="col-span-1">
                    <label className="block text-gray-700">Transfer Account</label>
                    <input
                        type="text"
                        value={transferAccount}
                        onChange={(e) => setTransferAccount(e.target.value)}
                        className="w-full p-2 border rounded-md focus:ring focus:ring-blue-200"
                    />
                </div>

                {/* Carrier Number */}
                <div className="col-span-1">
                    <label className="block text-gray-700">Carrier Number</label>
                    <input
                        type="text"
                        value={carrierNumber}
                        onChange={(e) => setCarrierNumber(e.target.value)}
                        className="w-full p-2 border rounded-md focus:ring focus:ring-blue-200"
                    />
                </div>
                <div className="col-span-2 flex justify-between mt-6">
                    <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-md">
                        Update Sale
                    </button>
                </div>
            </form>
        </Layout>
    );
};

export default SaleEdit;