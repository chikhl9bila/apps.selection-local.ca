import React from 'react';
import SummaryTable from './SummaryTable';

// Define the type for items
interface Item {
  id: number;
  category: string;
}

const items: Item[] = [
  { id: 1, category: 'BOEUF' },
  { id: 2, category: 'POULET' },
  { id: 3, category: 'PORC' },
  { id: 4, category: 'POISSON' },
  { id: 5, category: 'CONGÉLATEURS' },
  // More items...
];

const MenuBase: React.FC = () => {
  return (
    <ul role="list" className="space-y-3">
      {items.map((item) => (
        <li key={item.id} className="overflow-hidden rounded-md bg-white px-6 py-4 shadow">
          {/* Passing the category to SummaryTable as selectedCategory */}
          <SummaryTable selectedCategory={item.category} />
        </li>
      ))}
    </ul>
  );
};

export default MenuBase;
