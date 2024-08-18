import React, { useState } from 'react';
import '../CreateCommand/tailwind.output.css'; // Or the correct path to your compiled CSS


interface Tab {
  name: string;
  href: string;
  current: boolean;
}

interface NavbarCommandeProps {
  onCategoryChange: (category: string) => void;
}

const tabs: Tab[] = [
  { name: 'BOEUF', href: '#', current: true },
  { name: 'POULET', href: '#', current: false },
  { name: 'PORC', href: '#', current: false },
  { name: 'POISSON', href: '#', current: false },
  { name: 'ÉPICERIE', href: '#', current: false },
  { name: 'CONGÉLATEURS', href: '#', current: false },
  { name: 'FIN', href: '#', current: false },
];

const classNames = (...classes: (string | boolean | undefined)[]) =>
  classes.filter(Boolean).join(' ');

const NavbarCommande: React.FC<NavbarCommandeProps> = ({ onCategoryChange }) => {
  const [activeTab, setActiveTab] = useState<string>(
    tabs.find(tab => tab.current)?.name || tabs[0].name
  );

  const handleCategoryChange = (name: string) => {
    setActiveTab(name);
    onCategoryChange(name);
  };

  return (
    <div>
      <div className="sm:hidden">
        <label htmlFor="tabs" className="sr-only">
          Select a tab
        </label>
        <select
          id="tabs"
          name="tabs"
          className="block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
          value={activeTab}
          onChange={(e) => handleCategoryChange(e.target.value)}
        >
          {tabs.map((tab) => (
            <option key={tab.name} value={tab.name}>
              {tab.name}
            </option>
          ))}
        </select>
      </div>
      <div className="hidden sm:block">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex" aria-label="Tabs">
            {tabs.map((tab) => (
              <a
                key={tab.name}
                href={tab.href}
                className={classNames(
                  tab.name === activeTab
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                  'w-1/4 border-b-2 py-4 px-1 text-center text-sm font-medium'
                )}
                aria-current={tab.name === activeTab ? 'page' : undefined}
                onClick={(e) => {
                  e.preventDefault();
                  handleCategoryChange(tab.name);
                }}
              >
                {tab.name}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default NavbarCommande;
