// resources/js/Pages/SalePage.tsx
import React, { useState } from 'react';
import Layout from '../Layouts/Layout';
import SaleForm from '../Components/SaleForm';

const SalePage: React.FC = () => {
    const [selectedSection, setSelectedSection] = useState<string>('Sale');

    return (
        <Layout onSelect={setSelectedSection} selectedSection={selectedSection}>
            {selectedSection === 'Sale' && <SaleForm />}
            {selectedSection === 'Purchase' && <div>Purchase Section</div>}
            {selectedSection === 'Stock' && <div>Stock Section</div>}
            {selectedSection === 'Supplier' && <div>Supplier Section</div>}
            {selectedSection === 'Customer' && <div>Customer Section</div>}
            {selectedSection === 'Item' && <div>Item Section</div>}
            {selectedSection === 'Payment Method' && <div>Payment Method Section</div>}
        </Layout>
    );
};

export default SalePage;