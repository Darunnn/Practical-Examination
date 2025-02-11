import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteProduct, addProduct, updateProduct } from '../../features/productSlice';
import { FixedSizeList as List } from 'react-window';
import ProductForm from './ProductForm';
import useTheme from "../../hooks/useTheme";
import usePagination from "../../hooks/usePagination"; 

const ProductList = () => {
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const { theme } = useTheme();
  const { 
    data, 
    loading, 
    error, 
    currentPage, 
    goToPage,
    totalItems 
  } = usePagination('products', 10); 
  const totalPages = Math.ceil(totalItems / 10);

  useEffect(() => {
    const savedProducts = JSON.parse(localStorage.getItem('products')) || [];
    setProducts(savedProducts);
    dispatch(addProduct(savedProducts));
  }, [dispatch]);

  const deleteProductHandler = (productName) => {
    const updatedProducts = products.filter(product => product.name !== productName);
    localStorage.setItem('products', JSON.stringify(updatedProducts));
    setProducts(updatedProducts);
    dispatch(deleteProduct(productName));
  };

  const saveProductToLocalStorage = (product) => {
    const currentProducts = [...products];
    
    if (editingProduct) {
      
      const index = currentProducts.findIndex(p => p.id === editingProduct.id);
      if (index !== -1) {
        currentProducts[index] = {
          ...editingProduct,
          ...product
        };
      }
    } else {
      
      currentProducts.push({
        ...product,
        id: Date.now() 
      });
    }
  
    
    localStorage.setItem('products', JSON.stringify(currentProducts));
    setProducts(currentProducts);
    
    
    if (editingProduct) {
      dispatch(updateProduct(product)); 
    } else {
      dispatch(addProduct(product));
    }
    
    setShowForm(false);
  };

  const editProductHandler = (product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const addNewProductHandler = () => {
    setEditingProduct(null);
    setShowForm(true);
  };

  const Row = ({ index, style }) => {
    const product = products[index];
    return (
      <div style={style} className={`flex justify-between items-center p-4 ${
        theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-black'
      }`}>
        <span>{product.name} - ${product.price}</span>
        <div>
          <button 
            onClick={() => editProductHandler(product)}
            className="mr-2 px-3 py-1 bg-blue-500 text-white rounded"
          >
            Edit
          </button>
          <button 
            onClick={() => deleteProductHandler(product.name)}
            className="px-3 py-1 bg-red-500 text-white rounded"
          >
            Delete
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className={`p-6 min-h-screen ${
      theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'
    }`}>
    
  <h1 style={{ textAlign: 'center' }}>Product Management</h1>
  <div style={{display: "flex", justifyContent: "flex-end"}}>
  <button 
    onClick={addNewProductHandler}
    className="ml-auto px-4 py-2 bg-green-500 text-white hover:bg-green-600"
  >
    Add New Product
  </button>

  </div>
  
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className={`p-6 rounded-lg ${
            theme === 'dark' ? 'bg-gray-800' : 'bg-white'
          }`}>
            <div className="flex justify-between mb-4">
              <h2 className="text-xl font-bold">
                {editingProduct ? 'Edit Product' : 'Add New Product'}
              </h2>
              <button 
                onClick={() => setShowForm(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <ProductForm 
              product={editingProduct} 
              saveProduct={saveProductToLocalStorage} 
              closeForm={() => setShowForm(false)}
            />
          </div>
        </div>
      )}

      <div className="mt-4">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : products.length === 0 ? (
          <p>No products found</p>
        ) : (
          <List
            height={400}
            itemCount={products.length}
            itemSize={70}
            width="100%"
          >
            {Row}
          </List>
        )}
      </div>

      <div className="flex justify-between items-center mt-4">
        <button 
          onClick={() => goToPage(currentPage - 1)} 
          disabled={currentPage <= 1}
          className="px-4 py-2 bg-gray-300 text-black rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button 
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage >= totalPages}
          className="px-4 py-2 bg-gray-300 text-black rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ProductList;