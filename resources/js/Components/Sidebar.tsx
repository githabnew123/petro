import React from 'react';
import { Link } from '@inertiajs/inertia-react'; // Import Link from Inertia

interface SidebarProps {
    selectedSection: string;
}

const Sidebar: React.FC<SidebarProps> = ({ selectedSection }) => {
    const sections = [
        { label: 'Sale', value: 'Sale', route: '/' },
        { label: 'Sale Summary', value: 'Sale Summary', route: '/sale-summary' },
        {
            label: 'Inventory',
            children: [
                { label: 'Purchase', value: 'Purchase', route: '/purchases' },
            ]
        },
        {
            label: 'Setup',
            children: [
                { label: 'Supplier', value: 'Supplier', route: '/suppliers' },
                { label: 'Customer', value: 'Customer', route: '/customers' },
                { label: 'Item', value: 'Item', route: '/items' },
                { label: 'Payment Method', value: 'Payment Method', route: '/payment-methods' }
            ]
        }
    ];

    return (
        <aside className="w-64 bg-blue-300 text-white p-4 h-screen">
            <ul className="space-y-2">
                {sections.map(section =>
                    section.children ? (
                        <li key={section.label}>
                            <div className="font-bold py-2 px-4">{section.label}</div>
                            <ul className="ml-4">
                                {section.children.map(child => (
                                    <li key={child.value}>
                                        <Link
                                            href={child.route} // Use href instead of to
                                            className={`py-2 px-4 block cursor-pointer hover:bg-gray-700 rounded-lg ${
                                                selectedSection === child.value ? 'bg-blue-500' : ''
                                            }`}
                                        >
                                            {child.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </li>
                    ) : (
                        <li key={section.value}>
                            <Link
                                href={section.route} // Use href instead of to
                                className={`py-2 px-4 block cursor-pointer hover:bg-gray-700 rounded-lg ${
                                    selectedSection === section.value ? 'bg-blue-500' : ''
                                }`}
                            >
                                {section.label}
                            </Link>
                        </li>
                    )
                )}
            </ul>
        </aside>
    );
};

export default Sidebar;
