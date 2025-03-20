// resources/js/Components/Sidebar.tsx
import React, { useState } from 'react';

interface SidebarProps {
    onSelect: (section: string) => void;
    selectedSection: string;
}

const Sidebar: React.FC<SidebarProps> = ({ onSelect, selectedSection }) => {
    const [expandedMenu, setExpandedMenu] = useState<string | null>(null);

    const sections = [
        { label: 'Sale', value: 'Sale' },
        {
            label: 'Inventory',
            children: [
                { label: 'Purchase', value: 'Purchase' },
                { label: 'Stock', value: 'Stock' }
            ]
        },
        {
            label: 'Setup',
            children: [
                { label: 'Supplier', value: 'Supplier' },
                { label: 'Customer', value: 'Customer' },
                { label: 'Item', value: 'Item' },
                { label: 'Payment Method', value: 'Payment Method' }
            ]
        }
    ];

    const toggleMenu = (menu: string) => {
        setExpandedMenu(expandedMenu === menu ? null : menu);
    };

    return (
        <aside className="w-64 bg-gray-800 text-white p-4 h-screen">
            <ul className="space-y-2">
                {sections.map(section =>
                    section.children ? (
                        <li key={section.label}>
                            <div
                                className="cursor-pointer font-bold py-2 px-4 hover:bg-gray-700"
                                onClick={() => toggleMenu(section.label)}
                            >
                                {section.label}
                            </div>
                            {expandedMenu === section.label && (
                                <ul className="ml-4">
                                    {section.children.map(child => (
                                        <li
                                            key={child.value}
                                            className={`py-2 px-4 cursor-pointer hover:bg-gray-700 ${
                                                selectedSection === child.value ? 'bg-blue-500' : ''
                                            }`}
                                            onClick={() => onSelect(child.value)}
                                        >
                                            {child.label}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </li>
                    ) : (
                        <li
                            key={section.value}
                            className={`py-2 px-4 cursor-pointer hover:bg-gray-700 ${
                                selectedSection === section.value ? 'bg-blue-500' : ''
                            }`}
                            onClick={() => onSelect(section.value)}
                        >
                            {section.label}
                        </li>
                    )
                )}
            </ul>
        </aside>
    );
};

export default Sidebar;