import { createContext, useState, useEffect, useContext } from 'react';
import api from '../api/axios';
import { useAuth } from './AuthContext';
import { toast } from 'react-toastify';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(null);
  const { user } = useAuth();
  useEffect(() => {
    if (user) {
      fetchCart();
    } else {
      setCart(null);
    }
  }, [user]);

  const fetchCart = async () => {
    try {
      const { data } = await api.get('/cart');
      setCart(data);
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  };

  const addToCart = async (productId, quantity) => {
    try {
      const { data } = await api.post('/cart', {
        productId,
        quantity,

      });
      setCart(data);
      toast.success('Product added to cart 🛒');
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast.error('Failed to add product to cart');
      throw error;
    }
  };

  const updateQuantity = async (productId, quantity) => {
    try {
      const { data } = await api.put('/cart', { productId, quantity });
      setCart(data);
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };

  const removeFromCart = async (productId) => {
    try {
      const { data } = await api.delete(`/cart/${productId}`);
      setCart(data);
      toast.info('Product removed from cart');
    } catch (error) {
      console.error('Error removing from cart:', error);
      toast.error('Failed to remove product');
    }
  };

  const clearCart = async () => {
    try {
      const { data } = await api.delete('/cart/clear');
      setCart(data);
    } catch (error) {
      console.error('Error clearing cart:', error);
    }
  };

  const cartTotal =
    cart?.products?.reduce((acc, item) => {
      return acc + (item.productId?.price || 0) * item.quantity;
    }, 0) || 0;

  const cartItemCount = cart?.products?.reduce((acc, item) => acc + item.quantity, 0) || 0;

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        cartTotal,
        cartItemCount,
        fetchCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
