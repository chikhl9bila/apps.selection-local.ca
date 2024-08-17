import React from 'react';
import { useProductContext } from '../../contexts/ProductContext';

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
        className="bg-blue-600 text-white p-2 rounded-md shadow-lg hover:bg-blue-700 transition duration-300"
      >
        Reset to Basic Quantities for {category}
      </button>
  );
};

export default ResetToBasicButton;
