import { createContext, useState, useEffect, useContext, useCallback } from 'react';
import api from '../api/axios';
import { useAuth } from './AuthContext';
import { toast } from 'react-toastify';

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState({ products: [] });
  const [wishlistLoading, setWishlistLoading] = useState(false);
  const { user } = useAuth();

  const fetchWishlist = useCallback(async () => {
    if (!user) return;
    try {
      const { data } = await api.get('/wishlist');
      setWishlist(data);
    } catch (error) {
      console.error('Error fetching wishlist:', error);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      fetchWishlist();
    } else {
      setWishlist({ products: [] });
    }
  }, [user, fetchWishlist]);

  const toggleWishlist = async (productId) => {
    if (!user) {
      toast.info('Please login to use wishlist');
      return;
    }

    if (wishlistLoading) return; // Prevent rapid multiple clicks

    setWishlistLoading(true);
    
    // Optimistic check to see if we should add or remove
    const isAlreadyInWishlist = wishlist?.products?.some(
      (p) => (p._id || p) === productId
    );

    try {
      if (isAlreadyInWishlist) {
        // Remove from wishlist
        const { data } = await api.delete(`/wishlist/remove/${productId}`);
        setWishlist(data);
        toast.info('Removed from Wishlist 💔');
      } else {
        // Add to wishlist
        const { data } = await api.post('/wishlist/add', { productId });
        setWishlist(data);
        toast.success('Added to Wishlist ❤️');
      }
    } catch (error) {
      console.error('Error toggling wishlist:', error);
      const message = error.response?.data?.message || 'Failed to update wishlist';
      toast.error(message);
    } finally {
      setWishlistLoading(false);
    }
  };

  const wishlistCount = wishlist?.products?.length || 0;

  return (
    <WishlistContext.Provider value={{ 
      wishlist, 
      toggleWishlist, 
      wishlistCount, 
      wishlistLoading,
      fetchWishlist 
    }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
