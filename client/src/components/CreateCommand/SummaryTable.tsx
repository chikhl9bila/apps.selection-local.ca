import React from 'react';
import { useProductContext } from '../../contexts/ProductContext';
import '../CreateCommand/tailwind.output.css'; // Or the correct path to your compiled CSS

interface Product {
  id: number;
  name: string;
  format: string;
  price: number;
  quantities: number[];
  basicQuantities: number[];
  category: string;
}

interface SummaryTableProps {
  selectedCategory: string;
}

export default function SummaryTable({ selectedCategory }: SummaryTableProps) {
  const { products } = useProductContext();

  const calculateTotalPrice = (quantities: number[], price: number): number => {
    return quantities.reduce((total, quantity) => total + quantity * price, 0);
  };

  let totalAjout = 0;
  let totalCredit = 0;

  const filteredProducts = products.filter(
    (product: Product) => product.category === selectedCategory
  );

  return (
    <div className="px-6 py-4 sm:px-8 sm:py-6 lg:px-10 lg:py-8 bg-gray-50 rounded-xl shadow-lg">
      <div className="sm:flex sm:items-center mb-6">
        <div className="sm:flex-auto">
          <h1 className="text-3xl font-bold leading-8 text-blue-900">{selectedCategory}</h1>
        </div>
      </div>
      <div className="-mx-6 mt-8 flow-root sm:mx-0">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="border-b-2 border-blue-300 bg-blue-100 text-gray-900 rounded-t-lg">
            <tr>
              <th className="py-4 pl-6 pr-4 text-left text-lg font-semibold sm:pl-6">Description</th>
              <th className="px-6 py-4 text-right text-lg font-semibold">Format</th>
              <th className="px-6 py-4 text-right text-lg font-semibold">Prix boîte</th>
              <th className="px-6 py-4 text-right text-lg font-semibold">Qté base</th>
              <th className="px-6 py-4 text-right text-lg font-semibold">Qté</th>
              {[...Array(4).keys()].map((i) => (
                <th key={i} className="px-6 py-4 text-right text-lg font-semibold">Liv {i + 1}</th>
              ))}
              <th className="px-6 py-4 text-right text-lg font-semibold">Crédits / Ajouts</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredProducts.map((product: Product) => {
              const totalPrice = calculateTotalPrice(product.quantities, product.price);
              const totalPriceBasicQuantity = calculateTotalPrice(product.basicQuantities, product.price);
              const difference = totalPrice - totalPriceBasicQuantity;

              if (difference > 0) {
                totalAjout += difference;
              } else if (difference < 0) {
                totalCredit += difference;
              }

              return (
                <tr key={product.id} className="hover:bg-gray-100 transition-colors">
                  <td className="py-4 pl-6 pr-4 text-lg font-medium text-gray-900 sm:pl-6">{product.name}</td>
                  <td className="px-6 py-4 text-right text-lg text-gray-500">{product.format}</td>
                  <td className="px-6 py-4 text-right text-lg text-gray-500">{product.price.toFixed(2)}$</td>
                  <td className="px-6 py-4 text-right text-lg text-gray-500">{product.basicQuantities.reduce((sum, q) => sum + q, 0)}</td>
                  <td className="px-6 py-4 text-right text-lg text-gray-500">{product.quantities.reduce((sum, q) => sum + q, 0)}</td>
                  {product.quantities.map((quantity, index) => (
                    <td key={index} className="px-6 py-4 text-right text-lg text-gray-500">{quantity}</td>
                  ))}
                  {[...Array(4 - product.quantities.length)].map((_, index) => (
                    <td key={index} className="px-6 py-4 text-right text-lg text-gray-500">-</td>
                  ))}
                  <td
                    className={`px-6 py-4 text-right text-lg ${difference < 0 ? 'text-red-500' : 'text-green-500'}`}
                  >
                    {difference.toFixed(2)}$
                  </td>
                </tr>
              );
            })}
          </tbody>
          <tfoot className="bg-blue-50">
            <tr>
              <td colSpan={8} className="px-6 py-4 text-right text-lg font-semibold text-gray-900">Total Ajout (Positive):</td>
              <td className="px-6 py-4 text-right text-lg font-semibold text-green-500">{totalAjout.toFixed(2)}$</td>
            </tr>
            <tr>
              <td colSpan={8} className="px-6 py-4 text-right text-lg font-semibold text-gray-900">Total Crédit (Negative):</td>
              <td className="px-6 py-4 text-right text-lg font-semibold text-red-500">{totalCredit.toFixed(2)}$</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}
