import React from 'react';
import { useProductContext } from '../../contexts/ProductContext';

interface ResetButtonProps {
  category: string;
}

const ResetButton: React.FC<ResetButtonProps> = ({ category }) => {
  const { resetQuantitiesByCategory } = useProductContext();

  const handleReset = () => {
    resetQuantitiesByCategory(category);
  };

  return (
    <button onClick={handleReset} className="bg-red-500 text-white p-2 rounded">
      Reset Quantities for {category}
    </button>
  );
};

export default ResetButton;
