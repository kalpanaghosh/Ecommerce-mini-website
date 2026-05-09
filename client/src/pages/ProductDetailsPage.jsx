import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useWishlist } from '../context/WishlistContext';
import { ShoppingCart, ArrowLeft, Check, AlertCircle, Star, Heart } from 'lucide-react';

// Fallback image if the product image fails
const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=600';

/**
 * Star rating display for the product detail page
 */
const StarRating = ({ rating = 4 }) => {
  const full = Math.floor(rating);
  const hasHalf = rating - full >= 0.5;
  return (
    <div className="flex items-center gap-1">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`w-5 h-5 ${
            i < full
              ? 'text-amber-400 fill-amber-400'
              : i === full && hasHalf
              ? 'text-amber-400 fill-amber-400 opacity-50'
              : 'text-gray-300'
          }`}
        />
      ))}
      <span className="text-sm text-gray-500 ml-2">{rating.toFixed(1)} / 5.0</span>
    </div>
  );
};

const ProductDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [added, setAdded] = useState(false);
  const [error, setError] = useState('');
  const [imgSrc, setImgSrc] = useState('');
  
  const { addToCart } = useCart();
  const { user } = useAuth();
  const { wishlist, toggleWishlist } = useWishlist();
  
  const isWishlisted = product && wishlist?.products?.some(p => p._id === product._id || p === product._id);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await api.get(`/products/${id}`);
        setProduct(data);
        setImgSrc(data.image);
      } catch (err) {
        setError('Product not found');
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    if (!user) {
      navigate('/login');
      return;
    }
    
    setAdding(true);
    try {
      await addToCart(product._id, 1);
      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
    } catch (err) {
      console.error(err);
    } finally {
      setAdding(false);
    }
  };

  // Loading skeleton for product details
  if (loading) {
    return (
      <div className="bg-gray-50 dark:bg-gray-900 min-h-[calc(100vh-4rem)] py-12 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden animate-pulse">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 md:p-12">
              <div className="rounded-2xl bg-gray-200 dark:bg-gray-700 aspect-square" />
              <div className="flex flex-col justify-center space-y-4">
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-24" />
                <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
                <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-32" />
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full" />
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3" />
                <div className="h-14 bg-gray-200 dark:bg-gray-700 rounded w-48 mt-8" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Oops!</h2>
          <p className="text-gray-500 dark:text-gray-400">{error || 'Something went wrong'}</p>
          <button onClick={() => navigate('/')} className="mt-6 text-indigo-600 dark:text-indigo-400 hover:underline">
            Go back home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-[calc(100vh-4rem)] py-12 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <button 
          onClick={() => navigate(-1)} 
          className="flex items-center gap-2 text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 transition-colors mb-8"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to products
        </button>

        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 md:p-12">
            {/* Product Image with fallback */}
            <div className="rounded-2xl overflow-hidden bg-gray-100 aspect-square md:aspect-auto">
              <img 
                src={imgSrc} 
                alt={product.title} 
                onError={() => setImgSrc(FALLBACK_IMAGE)}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Product Details */}
            <div className="flex flex-col justify-center relative">
              <div className="mb-2 flex gap-2">
                <span className="inline-block px-3 py-1 bg-indigo-100 dark:bg-indigo-900/40 text-indigo-800 dark:text-indigo-300 text-xs font-semibold rounded-full uppercase tracking-wider">
                  {product.category || 'New Arrival'}
                </span>
              </div>
              
              <button 
                onClick={(e) => {
                  e.preventDefault();
                  toggleWishlist(product._id);
                }}
                className={`absolute top-0 right-0 p-3 rounded-full shadow-sm transition-all duration-300 hover:scale-110 active:scale-95 group/heart ${
                  isWishlisted 
                    ? 'bg-rose-50/90 dark:bg-rose-900/50 text-rose-500' 
                    : 'bg-gray-50 dark:bg-gray-700 text-gray-400 hover:text-rose-400'
                }`}
                title={isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
              >
                <Heart className={`w-6 h-6 transition-all duration-300 ${isWishlisted ? 'fill-rose-500 scale-110' : 'group-hover/heart:scale-110'}`} />
              </button>

              <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-4 pr-12">
                {product.title}
              </h1>

              {/* Star Rating */}
              {product.rating && (
                <div className="mb-4">
                  <StarRating rating={product.rating} />
                </div>
              )}

              <p className="text-3xl font-light text-indigo-600 dark:text-indigo-400 mb-6">
                ₹{typeof product.price === 'number' ? product.price.toLocaleString('en-IN') : Number(product.price).toLocaleString('en-IN')}
              </p>
              
              <div className="prose prose-indigo dark:prose-invert text-gray-500 dark:text-gray-400 mb-8">
                <p className="leading-relaxed">{product.description}</p>
              </div>

              <div className="mt-auto pt-8 border-t border-gray-100 dark:border-gray-700">
                <button
                  onClick={handleAddToCart}
                  disabled={adding}
                  className={`w-full md:w-auto flex items-center justify-center gap-3 px-8 py-4 rounded-xl text-lg font-bold text-white transition-all duration-300 shadow-lg ${
                    added ? 'bg-emerald-500 hover:bg-emerald-600 shadow-emerald-500/30' : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 hover:shadow-indigo-500/30 hover:-translate-y-1 active:scale-95'
                  } disabled:opacity-75 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:active:scale-100`}
                >
                  {added ? (
                    <>
                      <Check className="w-6 h-6" />
                      Added to Cart
                    </>
                  ) : (
                    <>
                      {adding ? (
                        <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      ) : (
                        <ShoppingCart className="w-6 h-6" />
                      )}
                      {adding ? 'Adding...' : 'Add to Cart'}
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
