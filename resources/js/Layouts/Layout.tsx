// resources/js/Layouts/Layout.tsx
import React from 'react';
import Sidebar from '../Components/Sidebar';

interface LayoutProps {
    children: React.ReactNode;
    onSelect: (section: string) => void;
    selectedSection: string;
}

const Layout: React.FC<LayoutProps> = ({ children, onSelect, selectedSection }) => {
    return (
        <div className="flex h-screen">
            <Sidebar onSelect={onSelect} selectedSection={selectedSection} />
            <main className="flex-1 p-6 bg-gray-100">{children}</main>
        </div>
    );
};

export default Layout;
