import React from 'react';
import Sidebar from '../Components/Sidebar';

interface LayoutProps {
    children: React.ReactNode;
    selectedSection: string;
}

const Layout: React.FC<LayoutProps> = ({ children, selectedSection }) => {
    return (
        <div className="flex h-screen">
            <Sidebar selectedSection={selectedSection} />
            <main className="flex-1 p-6 bg-gray-100">{children}</main>
        </div>
    );
};

export default Layout;