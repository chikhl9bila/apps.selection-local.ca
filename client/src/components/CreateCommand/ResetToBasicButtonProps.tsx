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
    <button onClick={handleResetToBasic} className="bg-blue-500 text-white p-2 rounded">
      Reset to Basic Quantities for {category}
    </button>
  );
};

export default ResetToBasicButton;
