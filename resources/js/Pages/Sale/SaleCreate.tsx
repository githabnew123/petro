import React, { useState, useEffect } from 'react';
import { Inertia } from '@inertiajs/inertia';
import printJS from 'print-js';
import Layout from '../../Layouts/Layout';

interface SaleFormProps {
  customers: { id: string; name: string }[];
  items: { id: string; name: string; price: number }[];
  paymentMethods: { id: string; name: string }[];
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

  const [availableQty, setAvailableQty] = useState<number | null>(null);
  const [carNumbers, setCarNumbers] = useState<string[]>([]);


  useEffect(() => {
    const calculatedTotal = retailPrice * qty;
    setTotal(calculatedTotal);
    setBalance(calculatedTotal - payment);
  }, [retailPrice, qty, payment]);

  useEffect(() => {
    if (!itemId) {
      setCarNumbers([]);
      return;
    }

    // Example: adjust this API route based on your backend logic
    fetch(`/car-numbers?item_id=${itemId}`)
      .then(res => res.json())
      .then(data => {
        setCarNumbers(data);
      });

  }, [itemId]);
  useEffect(() => {
    if (!itemId || !carNumber) {
      setAvailableQty(null);
      return;
    }

    fetch(`/stock-balance?item_id=${itemId}&car_number=${carNumber}`)
      .then(res => res.json())
      .then(data => {
        setAvailableQty(data.available_qty);
      });
  }, [itemId, carNumber]);


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate car number format
    const validateCarNumber = (value: string) => {
      const regex = /(\d{1,2}[A-Z]-\d{1,4})$/;
      return regex.test(value);
    };

    if (!validateCarNumber(carNumber)) {
      setError('Car number must be in the format: CODE-NUMBER (e.g., AYY-5 7A-2222)');
      return;
    }

    setError('');

    // Submit to server
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

  const handlePrint = () => {
    const receiptContent = `
      <div style="text-align: center; font-size: 14px;">
          <h3>Sale Receipt</h3>
          <p>Customer: ${customers.find(c => c.id === customerId)?.name || ''}</p>
          <p>Item: ${items.find(i => i.id === itemId)?.name || ''}</p>
          <p>Quantity: ${qty}</p>
          <p>Retail Price: $${retailPrice.toFixed(2)}</p>
          <p>Total: $${total.toFixed(2)}</p>
          <p>Payment: $${payment.toFixed(2)}</p>
          <p>Credit Amount: $${balance.toFixed(2)}</p>
          <p>Payment Method: ${paymentMethods.find(p => p.id === paymentMethodId)?.name || ''}</p>
          <p>Car Number: ${carNumber}</p>
          <p>---------------------------</p>
          <p>Thank You!</p>
      </div>
    `;
    printJS({
      printable: receiptContent,
      type: 'raw-html',
      style: 'text-align: center; font-size: 14px;',
    });
  };

  return (
    <Layout selectedSection="Sale">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md max-w-3xl mx-auto grid grid-cols-2 gap-4">
        <h3 className="text-2xl font-semibold mb-4 col-span-2 text-center">Sale Form</h3>
        {error && <p className="text-red-500 mb-4 col-span-2">{error}</p>}

        {/* Customer */}
        <div className="col-span-1">
          <label className="block text-gray-700">Customer</label>
          <select
            value={customerId}
            onChange={(e) => setCustomerId(e.target.value)}
            required
            className="w-full p-2 border rounded-md focus:ring focus:ring-blue-200"
          >
            <option value="">Select Customer</option>
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
              setItemId(e.target.value);
              const item = items.find(i => i.id === e.target.value);
              setRetailPrice(item ? item.price : 0);
            }}
            required
            className="w-full p-2 border rounded-md focus:ring focus:ring-blue-200"
          >
            <option value="">Select Item</option>
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
            onChange={(e) => setRetailPrice(parseFloat(e.target.value))}
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
            onChange={(e) => setQty(parseInt(e.target.value) || 1)}
            required
            className="w-full p-2 border rounded-md focus:ring focus:ring-blue-200"
          />
          {availableQty !== null && (
            <div className="col-span-2 text-sm text-blue-700">
              Available Quantity: {availableQty}
            </div>
          )}

        </div>

        {/* Total */}
        <div className="col-span-1">
          <label className="block text-gray-700">Total</label>
          <input
            type="number"
            value={total.toFixed(2)}
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
            value={balance.toFixed(2)}
            readOnly
            className="w-full p-2 border bg-gray-100 rounded-md"
          />
        </div>

        {/* Payment Method */}
        <div className="col-span-1">
          <label className="block text-gray-700">Payment Method</label>
          <select
            value={paymentMethodId}
            onChange={(e) => setPaymentMethodId(e.target.value)}
            required
            className="w-full p-2 border rounded-md focus:ring focus:ring-blue-200"
          >
            <option value="">Select Payment Method</option>
            {paymentMethods.map(method => (
              <option key={method.id} value={method.id}>{method.name}</option>
            ))}
          </select>
        </div>

        {/* Car Number */}
        <div className="col-span-2">
          <label className="block text-gray-700">Car Number</label>
          <select
            value={carNumber}
            onChange={(e) => setCarNumber(e.target.value)}
            required
            className="w-full p-2 border rounded-md focus:ring focus:ring-blue-200"
          >
            <option value="">Select Car Number</option>
            {(carNumbers).map(car => (
              <option key={car} value={car['car_number']}>{car['car_number']}</option>
            ))}
          </select>
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

        {/* Submit Button */}
        <div className="col-span-2 flex justify-between mt-6">
          <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-md">
            Submit Sale
          </button>
          <button type="button" onClick={handlePrint} className="bg-green-500 hover:bg-green-600 text-white py-2 px-6 rounded-md">
            Print Receipt
          </button>
        </div>
      </form>
    </Layout>
  );
};

export default SaleCreate;
