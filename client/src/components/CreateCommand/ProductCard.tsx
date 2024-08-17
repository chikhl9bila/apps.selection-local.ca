import React, { ChangeEvent } from 'react';
import { useProductContext } from '../../contexts/ProductContext';

interface Product {
  id: number;
  name: string;
  description: string;
  format: string;
  price: number;
  imageSrc: string;
  imageAlt: string;
  quantities: number[];
  basicQuantities?: number[];
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { updateProduct } = useProductContext();

  if (!product) {
    return <div>Product not found</div>; // Simple fallback
  }

  const handleQuantityChange = (index: number, event: ChangeEvent<HTMLInputElement>) => {
    const newQuantity = parseInt(event.target.value, 10);
    const newQuantities = [...product.quantities];
    newQuantities[index] = newQuantity;
    updateProduct(product.id, { quantities: newQuantities });
  };

  // Calculate the total price for basic quantities
  const basicTotalPrice = product.basicQuantities
    ? product.basicQuantities.reduce((total, quantity) => total + quantity * product.price, 0)
    : 0;

  // Calculate the total price for current quantities
  const totalPrice = product.quantities.reduce((total, quantity) => total + quantity * product.price, 0);

  // Calculate the difference
  const priceDifference = totalPrice - basicTotalPrice;

  return (
    <div
      key={product.id}
      className="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white"
    >
      <div className="aspect-h-4 aspect-w-3 bg-gray-200 sm:aspect-none group-hover:opacity-75 sm:h-96">
        <img
          src={product.imageSrc}
          alt={product.imageAlt}
          className="h-full w-full object-cover object-center sm:h-full sm:w-full"
        />
      </div>
      <div className="flex flex-1 flex-col space-y-2 p-4">
        <h3 className="text-sm font-medium text-gray-900">{product.name}</h3>
        <p className="text-sm text-gray-500">{product.description}</p>
        <div className="flex items-center space-x-4 border-t border-gray-300 pt-2">
          <div className="flex-1">
            <p className="text-sm text-gray-500">{product.format}</p>
          </div>
          <div className="w-px bg-gray-300 h-6"></div>
          <div className="flex-1 text-right">
            <p className="text-base font-medium text-gray-900">${product.price}</p>
          </div>
        </div>

        <div className="flex flex-col mt-4">
          <label htmlFor="quantities" className="text-sm font-medium text-gray-900 mt-4">
            Quantity per Delivery:
          </label>
          <div className="flex flex-row justify-center space-x-2 mt-2">
            {product.quantities.map((quantity, index) => (
              <div key={index} className="relative flex items-center space-x-2">
                <input
                  type="number"
                  min="0"
                  value={quantity}
                  onChange={(event) => handleQuantityChange(index, event)}
                  className="w-16 p-2 text-center border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                <span className="absolute top-0 left-0 text-xs text-gray-600 rounded-sm">
                  {index + 1}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Display the price difference */}
        <div className="mt-4 text-right">
          <p className={`text-lg text-center font-medium ${priceDifference < 0 ? 'text-red-500' : 'text-gray-900'}`}>
            ${priceDifference.toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
