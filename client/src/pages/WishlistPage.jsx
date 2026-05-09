import { useState, useEffect } from 'react';
import { useWishlist } from '../context/WishlistContext';
import { Link } from 'react-router-dom';
import { Heart, Trash2, ArrowRight } from 'lucide-react';

const WishlistPage = () => {
  const { wishlist, toggleWishlist } = useWishlist();

  if (!wishlist || !wishlist.products || wishlist.products.length === 0) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 transition-colors duration-300">
        <div className="text-center bg-white dark:bg-gray-800 p-12 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 max-w-md w-full">
          <div className="w-24 h-24 bg-rose-50 dark:bg-rose-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Heart className="w-12 h-12 text-rose-300 dark:text-rose-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Your Wishlist is Empty</h2>
          <p className="text-gray-500 dark:text-gray-400 mb-8">Save items you love here and buy them later.</p>
          <Link
            to="/"
            className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 transition-colors"
          >
            Start Exploring
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-[calc(100vh-4rem)] py-12 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 mb-8">
          <Heart className="w-8 h-8 text-rose-500 fill-rose-500" />
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">Your Wishlist</h1>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {wishlist.products.map((product) => {
            if (!product || !product._id) return null;
            return (
              <div key={product._id} className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 border border-gray-100 dark:border-gray-700 overflow-hidden flex flex-col h-full group">
                <div className="relative aspect-[4/3] overflow-hidden bg-gray-50 dark:bg-gray-900">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      toggleWishlist(product._id);
                    }}
                    className="absolute top-3 right-3 p-2 bg-white/80 dark:bg-gray-900/80 backdrop-blur text-red-500 rounded-full hover:bg-rose-100 dark:hover:bg-rose-900/50 transition-colors"
                    title="Remove from wishlist"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                
                <div className="p-5 flex flex-col flex-grow">
                  <Link to={`/product/${product._id}`}>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white line-clamp-1 hover:text-indigo-600 transition-colors">
                      {product.title}
                    </h3>
                  </Link>
                  <p className="mt-1 flex-grow text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
                    {product.description}
                  </p>
                  <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between">
                    <span className="text-xl font-extrabold text-gray-900 dark:text-white">
                      ₹{product.price.toLocaleString('en-IN')}
                    </span>
                    <Link
                      to={`/product/${product._id}`}
                      className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 flex items-center gap-1"
                    >
                      View
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default WishlistPage;
