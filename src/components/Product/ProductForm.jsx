import React, { useState, useEffect } from 'react';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
        <div className="flex justify-end">
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">✕</button>
        </div>
        {children}
      </div>
    </div>
  );
};

const ProductForm = ({ product, saveProduct, closeForm, products = [] }) => {
  const [formData, setFormData] = useState({ name: "", price: "" });
  const [error, setError] = useState("");
  const [nextId, setNextId] = useState(1); // เพิ่ม state สำหรับ nextId

  // ดึงข้อมูลสินค้าและอัพเดตค่าในฟอร์มเมื่อเปิดฟอร์มใหม่
  useEffect(() => {
    if (product) {
      setFormData({ name: product.name, price: product.price });
    }
    const highestId = products.reduce((max, p) => Math.max(max, p.id), 0);
    setNextId(highestId + 1);
  }, [product, products]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError(""); // ล้างข้อความข้อผิดพลาดเมื่อมีการพิมพ์ใหม่
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    // ตรวจสอบชื่อสินค้าไม่ให้ซ้ำกับสินค้าที่มีอยู่ใน products
    const isProductNameExists = products.some((p) => p.name.toLowerCase() === formData.name.toLowerCase());
    if (isProductNameExists) {
      setError("Product name must be unique.");
      return;
    }
  
    // สร้างสินค้าใหม่
    const newProduct = {
      ...formData,
      id: nextId, 
    };
  
    // บันทึกสินค้าใหม่
    saveProduct(newProduct);
   
    // เพิ่ม nextId สำหรับสินค้าต่อไป
    setNextId(nextId + 1);
  
    closeForm();
    
  };
  
  const handleCancel = () => {
    closeForm();
  };
  

  return (
    <Modal isOpen={true} onClose={closeForm}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Product Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Price</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded"
            required
          />
        </div>

        {error && <div className="text-red-500 text-sm">{error}</div>}

        <div className="flex justify-end space-x-2">
          <button
            type="button"
            onClick={handleCancel}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Save
          </button>
        </div>
      </form>
    </Modal>
  );
};


export default ProductForm;
