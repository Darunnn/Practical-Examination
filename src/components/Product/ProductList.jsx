import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteProduct, addProduct, initializeFromLocalStorage, updateProduct, updateNextId } from '../../features/productSlice';
import { addToCart } from '../../features/cartSlice';
import { FixedSizeList as List } from 'react-window';
import ProductForm from './ProductForm';
import useTheme from "../../hooks/useTheme";
import { CSVLink } from 'react-csv';

const ProductList = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.items);
  const nextId = useSelector((state) => state.products.nextId);
  const [editingProduct, setEditingProduct] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const { theme } = useTheme();

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = products.slice(startIndex, endIndex);
  const totalPages = Math.ceil(products.length / itemsPerPage);

  useEffect(() => {
    dispatch(initializeFromLocalStorage());
  }, [dispatch]);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const deleteProductHandler = (productId) => {
    const updatedProducts = products.filter(product => product.id !== productId);
    localStorage.setItem('products', JSON.stringify(updatedProducts));
    dispatch(deleteProduct(productId));
  };

  // เพิ่มฟังก์ชันที่หายไป
  const addNewProductHandler = () => {
    setEditingProduct(null);
    setShowForm(true);
  };

  const editProductHandler = (product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const addToCartHandler = (product) => {
    dispatch(addToCart(product));
  };

  const saveProductToLocalStorage = (product) => {
    const currentProducts = [...products];
    const newProduct = { 
      ...product, 
      id: editingProduct ? editingProduct.id : nextId 
    };

    if (!editingProduct) {
      currentProducts.push(newProduct);
      dispatch(addProduct(newProduct));
      dispatch(updateNextId(nextId + 1));
    } else {
      const index = currentProducts.findIndex(p => p.id === editingProduct.id);
      if (index !== -1) {
        currentProducts[index] = { ...editingProduct, ...product };
        dispatch(updateProduct(currentProducts[index]));
      }
    }

    localStorage.setItem('products', JSON.stringify(currentProducts));
    setShowForm(false);
  };

  const Row = ({ index, style }) => {
    const product = currentProducts[index];
    if (!product) return null;
    
    return (
      <div style={style} className={`flex justify-between items-center p-4 ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
        <span>{product.name} - ${product.price}</span>
        <div>
          <button onClick={() => editProductHandler(product)} className="mr-2 px-3 py-1 bg-blue-500 text-white rounded">Edit</button>
          <button onClick={() => deleteProductHandler(product.id)} className="px-3 py-1 bg-red-500 text-white rounded">Delete</button>
          <button onClick={() => addToCartHandler(product)} className="ml-2 px-3 py-1 bg-green-500 text-white rounded">Add to Cart</button>
        </div>
      </div>
    );
  };

  const productData = products.map((product) => ({
    id: product.id,
    name: product.name,
    price: product.price,
    description: product.description,
  }));

  return (
    <div className={`p-6 min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'}`}>
      <h1 className="text-center">Product Management</h1>
      <div className="flex justify-between items-center">
        {!showForm && (
          <button onClick={addNewProductHandler} className="px-4 py-2 bg-green-500 text-white hover:bg-green-600">
            Add New Product
          </button>
        )}
        <select 
          value={itemsPerPage} 
          onChange={(e) => setItemsPerPage(Number(e.target.value))} 
          className="px-2 py-1 border rounded"
        >
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={30}>30</option>
        </select>
      </div>

      <div className="my-4">
        <CSVLink data={productData} filename="products.csv">
          <button className="px-4 py-2 bg-blue-500 text-white hover:bg-blue-600">
            Export to CSV
          </button>
        </CSVLink>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="flex justify-between mb-4">
              <h2 className="text-xl font-bold">{editingProduct ? 'Edit Product' : 'Add New Product'}</h2>
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
        {products.length === 0 ? (
          <p>No products found. Please add a new product.</p>
        ) : (
          <List
            height={400}
            itemCount={currentProducts.length}
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