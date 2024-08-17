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
    <button
      onClick={handleReset}
      className="bg-red-600 text-white py-2 px-4 rounded-md shadow-md hover:bg-red-700 transition duration-300 ease-in-out transform hover:scale-105"
    >
      Reset Quantities for {category}
    </button>
  );
};

export default ResetButton;
