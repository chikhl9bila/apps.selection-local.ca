import React from 'react';
import { useProductContext } from '../../contexts/ProductContext';
import { ArrowUturnLeftIcon } from '@heroicons/react/24/outline';
import '../CreateCommand/tailwind.output.css'; // Or the correct path to your compiled CSS

interface ResetToBasicButtonProps {
  category: string;
}

const ResetToBasicButton: React.FC<ResetToBasicButtonProps> = ({ category }) => {
  const { resetToBasicQuantitiesByCategory } = useProductContext();

  const handleResetToBasic = () => {
    resetToBasicQuantitiesByCategory(category);
  };

  return (
    <button
      onClick={handleResetToBasic}
      className="flex items-center space-x-2 bg-blue-600 text-white p-2 rounded-md shadow-lg hover:bg-blue-700 transition duration-300"
    >
      <ArrowUturnLeftIcon className="h-5 w-5" />
      <span>Reset to Basic {category}</span>
    </button>
  );
};

export default ResetToBasicButton;
