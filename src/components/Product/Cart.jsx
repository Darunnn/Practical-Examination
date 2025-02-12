// src/components/Cart/Cart.js
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart, increaseQuantity, decreaseQuantity, clearCart } from '../../features/cartSlice';

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.cart);

  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleRemove = (product) => {
    dispatch(removeFromCart(product));
  };

  const handleIncrease = (product) => {
    dispatch(increaseQuantity(product));
  };

  const handleDecrease = (product) => {
    dispatch(decreaseQuantity(product));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <div className="p-6 min-h-screen bg-gray-100 text-black">
      <h1 className="text-center mb-4">Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          <ul>
            {cartItems.map((item) => (
              <li key={item.id} className="flex justify-between items-center mb-4">
                <span>{item.name} - ${item.price} x {item.quantity}</span>
                <div>
                  <button onClick={() => handleIncrease(item)} className="px-2 py-1 bg-blue-500 text-white rounded">+</button>
                  <button onClick={() => handleDecrease(item)} className="px-2 py-1 bg-yellow-500 text-white rounded">-</button>
                  <button onClick={() => handleRemove(item)} className="px-2 py-1 bg-red-500 text-white rounded">Remove</button>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-4">
            <p>Total Price: ${totalPrice}</p>
            <button onClick={handleClearCart} className="px-4 py-2 bg-red-500 text-white rounded">Clear Cart</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
