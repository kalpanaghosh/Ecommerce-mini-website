import { useState, useEffect, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import api from '../api/axios';
import { useWishlist } from '../context/WishlistContext';
import { AlertCircle, Filter, Star, ShieldCheck, Truck, Clock, ArrowRight, Heart } from 'lucide-react';

// Fallback image when a product image fails to load
const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=600';

/**
 * Skeleton loader card — shown while products are fetching
 */
const SkeletonCard = () => (
  <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 overflow-hidden animate-pulse flex flex-col h-full relative">
    <div className="w-full aspect-[4/3] bg-gray-200" />
    <div className="p-5 flex flex-col flex-grow relative bg-white dark:bg-gray-800">
      <div className="absolute -top-4 right-4 bg-white dark:bg-gray-800 shadow-sm border border-gray-100 px-8 py-3 rounded-full z-20" />
      <div className="h-4 bg-gray-200 rounded w-3/4 mb-3 mt-2" />
      <div className="h-3 bg-gray-200 rounded w-full mb-1" />
      <div className="h-3 bg-gray-200 rounded w-2/3 mb-4" />
      <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <div className="h-2 bg-gray-200 rounded w-8" />
          <div className="h-5 bg-gray-200 rounded w-16" />
        </div>
        <div className="h-9 bg-gray-200 rounded-xl w-20" />
      </div>
    </div>
  </div>
);

/**
 * Star rating component — renders filled and empty stars
 */
const StarRating = ({ rating = 4 }) => {
  const full = Math.floor(rating);
  const hasHalf = rating - full >= 0.5;
  return (
    <div className="flex items-center gap-0.5">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`w-3.5 h-3.5 ${i < full
            ? 'text-amber-400 fill-amber-400'
            : i === full && hasHalf
              ? 'text-amber-400 fill-amber-400 opacity-50'
              : 'text-gray-300'
            }`}
        />
      ))}
      <span className="text-xs text-gray-600 dark:text-gray-200 ml-1">{rating.toFixed(1)}</span>
    </div>
  );
};

/**
 * Product card component with premium UI and hover effects
 */
const ProductCard = ({ product }) => {
  const [imgSrc, setImgSrc] = useState(product.image);
  const { wishlist, toggleWishlist } = useWishlist();

  const isWishlisted = wishlist?.products?.some(p => p._id === product._id || p === product._id);

  return (
    <div className="bg-white dark:bg-gray-800 dark:text-white rounded-2xl shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] hover:shadow-[0_20px_40px_-15px_rgba(6,81,237,0.15)] dark:shadow-none dark:hover:shadow-[0_0_30px_rgba(0,0,0,0.5)] hover:-translate-y-2 transition-all duration-300 ease-out group flex flex-col h-full border border-gray-100 dark:border-gray-700 overflow-hidden relative">
      {/* Image Container */}
      <div className="relative overflow-hidden aspect-[4/3] bg-gray-50 flex items-center justify-center product.title">
        <Link to={`/product/${product._id}`} className="absolute inset-0 z-10 block" />
        <img
          src={imgSrc}
          alt={product.title}
          onError={() => setImgSrc(FALLBACK_IMAGE)}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]"
        />
        {/* Subtle overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-gray-900/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

        {/* Badges */}
        <div className="absolute top-3 left-3 z-20 flex flex-col gap-2 pointer-events-none dark:text-gray-300">
          {product.category && (
            <span className="bg-white dark:bg-gray-900/80 backdrop-blur-md text-slate-800 text-[11px] font-bold px-3 py-1.5 rounded-full shadow-sm uppercase tracking-widest border border-white/50 dark:text-gray-300">
              {product.category}
            </span>
          )}
        </div>
        {(product.rating >= 4.7) && (
          <div className="absolute top-3 right-3 z-20 pointer-events-none">
            <span className="bg-gradient-to-tr from-rose-500 to-orange-400 text-white text-[10px] font-extrabold px-3 py-1.5 rounded-full shadow-md uppercase tracking-wider animate-pulse border border-white/20">
              Hot
            </span>
          </div>
        )}

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleWishlist(product._id);
          }}
          className={`absolute bottom-3 right-3 z-20 p-2.5 rounded-full shadow-md backdrop-blur-md transition-all duration-300 hover:scale-110 active:scale-95 group/heart ${isWishlisted
            ? 'bg-rose-50/90 dark:bg-rose-900/50 text-rose-500'
            : 'bg-white/80 dark:bg-gray-700 dark:text-white/80 text-gray-600 dark:text-gray-200 hover:text-rose-400'
            }`}
          title={isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
        >
          <Heart className={`w-5 h-5 transition-all duration-300 ${isWishlisted ? 'fill-rose-500 scale-110' : 'group-hover/heart:scale-110'}`} />
        </button>
      </div>

      {/* Product Content */}
      <div className="p-5 flex flex-col flex-grow relative bg-white dark:bg-gray-800 dark:text-white">
        {/* Rating overlay slightly overlapping the image */}
        <div className="absolute -top-4 right-4 bg-white dark:bg-gray-800 dark:text-white shadow-md border border-gray-100 dark:border-gray-700 px-3 py-1 rounded-full z-20 flex items-center">
          {product.rating && <StarRating rating={product.rating} />}
        </div>

        <Link to={`/product/${product._id}`} className="block mt-2 mb-1 z-10">
          <h3 className="text-[1.05rem] font-bold text-gray-900 dark:text-white line-clamp-1 group-hover:text-indigo-600 transition-colors leading-tight font-sans dark:text-gray-300">
            {product.title}
          </h3>
        </Link>

        <p className="text-gray-600 dark:text-gray-200 text-sm line-clamp-2 mb-4 flex-grow leading-relaxed">
          {product.description}
        </p>

        {/* Footer actions */}
        <div className="mt-auto pt-4 border-t border-gray-100/60 flex items-center justify-between z-10">
          <div className="flex flex-col">
            <span className="text-[10px] uppercase tracking-wider text-gray-600 dark:text-gray-200 font-semibold">Price</span>
            <span className="text-xl font-extrabold text-gray-900 dark:text-white leading-none">
              ₹{typeof product.price === 'number' ? product.price.toLocaleString('en-IN') : product.price}
            </span>
          </div>
          <Link
            to={`/product/${product._id}`}
            className="flex items-center justify-center gap-2 bg-slate-900 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-indigo-600 transition-all duration-300 active:scale-95 shadow-md shadow-slate-200 group/btn"
          >
            <span>View</span>
            <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
};

/**
 * HomePage — Main product listing page with category filters
 */
const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch all products on mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await api.get('/products');
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
        setError('Failed to load products. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const location = useLocation();

  // Read category and search from URL params
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const categoryParam = params.get('category');
    const searchParam = params.get('search');

    if (categoryParam) setSelectedCategory(categoryParam);
    if (searchParam) setSearchQuery(searchParam.toLowerCase());
    else setSearchQuery('');

    if (categoryParam || searchParam) {
      setTimeout(() => {
        const el = document.getElementById('products-grid');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }, [location.search]);

  // Extract unique categories from products
  const categories = useMemo(() => {
    const cats = new Set(products.map(p => p.category || 'Uncategorized'));
    return ['All', ...Array.from(cats)].sort();
  }, [products]);

  // Filter products by selected category and search query
  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const matchCategory = selectedCategory === 'All' || (p.category || 'Uncategorized') === selectedCategory;
      const matchSearch = !searchQuery ||
        p.title.toLowerCase().includes(searchQuery) ||
        p.description.toLowerCase().includes(searchQuery) ||
        (p.category && p.category.toLowerCase().includes(searchQuery));

      return matchCategory && matchSearch;
    });
  }, [products, selectedCategory, searchQuery]);

  // Error state
  if (error) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <p className="text-xl font-medium text-gray-900 dark:text-white">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-[calc(100vh-4rem)] pb-12">
      {/* Hero Banner */}
      <div className="relative bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-950 overflow-hidden mb-12 py-20 lg:py-28">
        {/* Abstract Background Shapes */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
          <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-indigo-500/20 blur-3xl animate-blob"></div>
          <div className="absolute top-[20%] -right-[10%] w-[40%] h-[40%] rounded-full bg-purple-500/20 blur-3xl animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-[20%] left-[20%] w-[60%] h-[60%] rounded-full bg-pink-500/20 blur-3xl animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block py-1 px-3 rounded-full bg-indigo-800/50 border border-indigo-500/30 text-indigo-200 text-sm font-semibold mb-6 backdrop-blur-sm">
            ✨ Welcome to the future of shopping
          </span>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight mb-6 drop-shadow-md">
            Discover <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-pink-400">Premium</span> Products
          </h1>
          <p className="text-lg md:text-xl text-indigo-100/90 max-w-2xl mx-auto mb-10 leading-relaxed font-light">
            Upgrade your lifestyle with our curated collection of top-tier gadgets, accessories, and everyday essentials.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
            <button
              onClick={() => {
                const element = document.getElementById('products-grid');
                element?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-8 py-4 bg-white dark:bg-gray-800 text-indigo-900 rounded-full font-bold text-lg hover:bg-indigo-50 hover:scale-105 transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.3)] flex items-center gap-2 group"
            >
              Shop Now
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Feature Highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto border-t border-white/10 pt-10">
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-white dark:bg-gray-800/10 flex items-center justify-center mb-3 backdrop-blur-md border border-white/5">
                <Truck className="w-6 h-6 text-indigo-300" />
              </div>
              <h3 className="text-white font-semibold mb-1">Free Shipping</h3>
              <p className="text-indigo-200/70 text-sm">On orders over ₹4,000</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-white dark:bg-gray-800/10 flex items-center justify-center mb-3 backdrop-blur-md border border-white/5">
                <ShieldCheck className="w-6 h-6 text-indigo-300" />
              </div>
              <h3 className="text-white font-semibold mb-1">Secure Payment</h3>
              <p className="text-indigo-200/70 text-sm">100% protected checkout</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-white dark:bg-gray-800/10 flex items-center justify-center mb-3 backdrop-blur-md border border-white/5">
                <Clock className="w-6 h-6 text-indigo-300" />
              </div>
              <h3 className="text-white font-semibold mb-1">Fast Delivery</h3>
              <p className="text-indigo-200/70 text-sm">2-4 business days</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Category Filter */}
        <div className="mb-10" id="products-grid">
          <div className="flex items-center justify-between mb-6 border-b border-gray-200 dark:border-gray-700 pb-4">
            <div className="flex items-center gap-2 text-gray-800">
              <Filter className="w-5 h-5 text-indigo-600" />
              <h2 className="text-2xl font-bold tracking-tight">Our Collection</h2>
            </div>
            {!loading && (
              <span className="hidden sm:inline-block text-sm font-medium text-gray-600 dark:text-gray-200 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full dark:text-gray-300">
                Showing {filteredProducts.length} products
              </span>
            )}
          </div>
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${selectedCategory === category
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md shadow-indigo-200 transform scale-105'
                  : 'bg-white dark:bg-gray-900 text-gray-600 border border-gray-200 dark:border-gray-700 hover:border-indigo-300 hover:bg-indigo-50/50 hover:text-indigo-700 hover:shadow-sm dark:text-gray-300'
                  }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Loading Skeleton */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[...Array(8)].map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : filteredProducts.length === 0 ? (
          /* Empty State */
          <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100">
            <p className="text-gray-600 dark:text-gray-200 text-lg">No products found in this category.</p>
          </div>
        ) : (
          /* Product Grid — 1 col mobile, 2 tablet, 4 desktop */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {filteredProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
