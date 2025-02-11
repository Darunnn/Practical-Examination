import React, { useState, useEffect } from 'react';
import useTheme from '../../hooks/useTheme';

const ProductForm = ({ product, saveProduct, closeForm }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const { theme } = useTheme();

  useEffect(() => {
    if (product) {
      setName(product.name);
      setPrice(product.price);
    }
  }, [product]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newProduct = {
      id: product?.id || Date.now(), // ใช้ id เดิมถ้ามี
      name,
      price: parseFloat(price)
    };
    saveProduct(newProduct);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block mb-2">Product Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={`w-full p-2 rounded border ${
            theme === 'dark' ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'
          }`}
          required
        />
      </div>
      
      <div>
        <label className="block mb-2">Price</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className={`w-full p-2 rounded border ${
            theme === 'dark' ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'
          }`}
          required
        />
      </div>

      <div className="flex justify-end space-x-2">
        <button
          type="button"
          onClick={closeForm}
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Save
        </button>
      </div>
    </form>
  );
};

export default ProductForm;