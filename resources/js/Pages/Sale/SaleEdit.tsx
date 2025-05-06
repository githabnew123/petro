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
    const [formData, setFormData] = useState({
        customerId: sale.customer.id,
        itemId: sale.item.id,
        retailPrice: sale.retail_price,
        qty: sale.qty,
        paymentMethodId: sale.payment_method.id,
        carNumber: sale.car_number,
        payment: sale.payment,
        transferAccount: sale.transfer_account || '',
        carrierNumber: sale.carrier_number || '',
    });

    const [total, setTotal] = useState(sale.total);
    const [balance, setBalance] = useState(sale.balance);
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const calculatedTotal = formData.retailPrice * formData.qty;
        setTotal(calculatedTotal);
        setBalance(calculatedTotal - formData.payment);
    }, [formData.retailPrice, formData.qty, formData.payment]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        setFormData(prev => ({
            ...prev,
            [name]: name.includes('Id') ? Number(value) : value
        }));

        // Update retail price when item changes
        if (name === 'itemId') {
            const selectedItem = items.find(i => i.id === Number(value));
            if (selectedItem) {
                setFormData(prev => ({
                    ...prev,
                    retailPrice: selectedItem.price
                }));
            }
        }
    };

    const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const numValue = parseFloat(value) || 0;

        setFormData(prev => ({
            ...prev,
            [name]: name === 'qty' ? Math.max(1, numValue) : Math.max(0, numValue)
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError('');
    
        try {
            await Inertia.put(`/sales/${sale.id}`, {
                customer: formData.customerId,
                item: formData.itemId,
                retail_price: formData.retailPrice,
                qty: formData.qty,
                payment_method: formData.paymentMethodId,
                car_number: formData.carNumber,
                payment: formData.payment,
                transfer_account: formData.transferAccount,
                carrier_number: formData.carrierNumber,
                total,
                balance,
            }, {
                onError: (errors) => {
                    if (errors.message) {
                        setError(errors.message);
                    } else {
                        setError('An error occurred while updating the sale. Please try again.');
                    }
                },
                preserveScroll: true,
            });
    
        } catch (err) {
            // Type guard to check if err is an instance of Error
            if (err instanceof Error) {
                // Handle known error types
                if (err.message.includes('409')) {
                    setError('Conflict detected. Please refresh the page and try again.');
                } else {
                    setError('An unexpected error occurred: ' + err.message);
                }
            } else {
                // Handle unknown error
                setError('An unexpected error occurred. Please try again.');
            }
        } finally {
            setIsSubmitting(false);
        }
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
                        name="customerId"
                        value={formData.customerId}
                        onChange={handleChange}
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
                        name="itemId"
                        value={formData.itemId}
                        onChange={handleChange}
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
                        name="retailPrice"
                        value={formData.retailPrice}
                        onChange={handleNumberChange}
                        min="0"
                        step="0.01"
                        required
                        className="w-full p-2 border rounded-md focus:ring focus:ring-blue-200"
                    />
                </div>

                {/* Quantity */}
                <div className="col-span-1">
                    <label className="block text-gray-700">Quantity</label>
                    <input
                        type="number"
                        name="qty"
                        value={formData.qty}
                        onChange={handleNumberChange}
                        min="1"
                        required
                        className="w-full p-2 border rounded-md focus:ring focus:ring-blue-200"
                    />
                </div>

                {/* Total */}
                <div className="col-span-1">
                    <label className="block text-gray-700">Total</label>
                    <input
                        type="text"
                        value={total}
                        readOnly
                        className="w-full p-2 border bg-gray-100 rounded-md"
                    />
                </div>

                {/* Payment */}
                <div className="col-span-1">
                    <label className="block text-gray-700">Payment</label>
                    <input
                        type="number"
                        name="payment"
                        value={formData.payment}
                        onChange={handleNumberChange}
                        min="0"
                        step="0.01"
                        required
                        className="w-full p-2 border rounded-md focus:ring focus:ring-blue-200"
                    />
                </div>

                {/* Balance */}
                <div className="col-span-1">
                    <label className="block text-gray-700">Credit Amount</label>
                    <input
                        type="text"
                        value={balance}
                        readOnly
                        className="w-full p-2 border bg-gray-100 rounded-md"
                    />
                </div>

                {/* Payment Method */}
                <div className="col-span-1">
                    <label className="block text-gray-700">Payment Method</label>
                    <select
                        name="paymentMethodId"
                        value={formData.paymentMethodId}
                        onChange={handleChange}
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
                        name="carNumber"
                        value={formData.carNumber}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border rounded-md focus:ring focus:ring-blue-200"
                        placeholder="ABC-1234"
                    />
                </div>

                {/* Transfer Account */}
                <div className="col-span-1">
                    <label className="block text-gray-700">Transfer Account</label>
                    <input
                        type="text"
                        name="transferAccount"
                        value={formData.transferAccount}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-md focus:ring focus:ring-blue-200"
                    />
                </div>

                {/* Carrier Number */}
                <div className="col-span-1">
                    <label className="block text-gray-700">Carrier Number</label>
                    <input
                        type="text"
                        name="carrierNumber"
                        value={formData.carrierNumber}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-md focus:ring focus:ring-blue-200"
                    />
                </div>

                <div className="col-span-2 flex justify-between mt-6">
                    <button
                        type="button"
                        onClick={() => window.location.reload()}
                        className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-md"
                    >
                        Refresh Data
                    </button>
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-md disabled:opacity-50"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Updating...' : 'Update Sale'}
                    </button>
                </div>
            </form>
        </Layout>
    );
};

export default SaleEdit;