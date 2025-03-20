// resources/js/Pages/SalePage.tsx
import React from 'react';
import Layout from '../Layouts/Layout';
import SaleForm from '../Components/SaleForm';

const SalePage: React.FC = () => {
    return (
        <Layout selectedSection="Sale">
            <SaleForm />
        </Layout>
    );
};

export default SalePage;