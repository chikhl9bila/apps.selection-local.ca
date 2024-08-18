import React from 'react';
import { useProductContext } from '../../contexts/ProductContext';
import { ArrowPathIcon } from '@heroicons/react/24/outline';
import '../CreateCommand/tailwind.output.css'; // Or the correct path to your compiled CSS

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
      className="flex items-center space-x-2 bg-red-600 text-white py-2 px-4 rounded-md shadow-md hover:bg-red-700 transition duration-300 ease-in-out transform hover:scale-105"
    >
      <ArrowPathIcon className="h-5 w-5" />
      <span>Reset {category}</span>
    </button>
  );
};

export default ResetButton;
