import React from 'react';
import { useProductContext } from '../../contexts/ProductContext';

const FoodServiceSummary: React.FC = () => {
  const { calculateTotalFoodService } = useProductContext();
  const { totalService, maintenanceExpenses, totalProductsPrice } = calculateTotalFoodService();

  // Assuming the provided amounts are weekly and multiplying by 52 for annual calculations
  const weeklyTotalService = totalService / 52;
  const weeklyMaintenanceExpenses = maintenanceExpenses / 52;
  const weeklyTotalProductsPrice = totalProductsPrice / 52;

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <table className="w-full text-left">
        <thead>
          <tr>
            <th className="text-xl font-semibold">Description</th>
            <th className="text-xl font-semibold text-right">Weekly</th>
            <th className="text-xl font-semibold text-right">Annual</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="py-2">Total of your food service:</td>
            <td className="py-2 text-right">${weeklyTotalService.toFixed(2)}</td>
            <td className="py-2 text-right">${totalService.toFixed(2)}</td>
          </tr>
          <tr>
            <td className="py-2">Includes meats, prepared meals, dry groceries, and freezer (if option selected):</td>
            <td className="py-2 text-right">${weeklyTotalProductsPrice.toFixed(2)}</td>
            <td className="py-2 text-right">${totalProductsPrice.toFixed(2)}</td>
          </tr>
          <tr>
            <td className="py-2">Maintenance expenses:</td>
            <td className="py-2 text-right">${weeklyMaintenanceExpenses.toFixed(2)}</td>
            <td className="py-2 text-right">${maintenanceExpenses.toFixed(2)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default FoodServiceSummary;
