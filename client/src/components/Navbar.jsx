import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useTheme } from '../context/ThemeContext';
import { ShoppingCart, LogOut, User as UserIcon, Heart, Search, Moon, Sun, Menu, X, Package } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { cartItemCount } = useCart();
  const { wishlistCount } = useWishlist();
  const { isDarkMode, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Sync search input with URL params if returning to home
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const q = params.get('search');
    if (q !== null) {
      setSearchQuery(q);
    } else {
      setSearchQuery('');
    }
  }, [location.search]);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    // Navigate instantly to home page with search query
    if (value.trim()) {
      navigate('/?search=' + encodeURIComponent(value), { replace: true });
    } else {
      navigate('/', { replace: true });
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white/85 dark:bg-gray-900/85 backdrop-blur-md shadow-sm border-b border-gray-200/50 dark:border-gray-700/50 sticky top-0 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center gap-2 group">
              <div className="w-9 h-9 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-md group-hover:shadow-lg group-hover:scale-105 transition-all duration-300">
                <span className="text-white font-bold text-xl">L</span>
              </div>
              <span className="font-bold text-xl text-gray-900 dark:text-white tracking-tight group-hover:text-indigo-600 transition-colors hidden sm:block">LuxeStore</span>
            </Link>
          </div>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-md mx-6">
            <div className="relative w-full group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-600 dark:text-gray-200 group-focus-within:text-indigo-500 transition-colors" />
              </div>
              <input
                type="text"
                placeholder="Search products, categories..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="block w-full pl-10 pr-3 py-2 border border-gray-200 dark:border-gray-700 rounded-full leading-5 bg-gray-50 dark:bg-gray-700 dark:text-white text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-all duration-300"
              />
            </div>
          </div>

          {/* Icons & Auth */}
          <div className="flex items-center gap-3 sm:gap-6">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 text-gray-600 dark:text-gray-200 hover:text-indigo-600 dark:text-white dark:hover:text-indigo-400 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              title="Toggle Dark Mode"
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {user ? (
              <>
                {/* Wishlist Icon */}
                <Link to="/wishlist" className="relative text-gray-600 hover:text-rose-500 dark:text-white dark:hover:text-rose-400 transition-all duration-300 hover:scale-110">
                  <Heart className="w-6 h-6" />
                  {wishlistCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-rose-500 text-white text-[10px] font-bold rounded-full h-5 w-5 flex items-center justify-center shadow-sm">
                      {wishlistCount}
                    </span>
                  )}
                </Link>

                {/* Cart Icon */}
                <Link to="/cart" className="relative text-gray-600 hover:text-indigo-600 dark:text-white dark:hover:text-indigo-400 transition-all duration-300 hover:scale-110">
                  <ShoppingCart className="w-6 h-6" />
                  {cartItemCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-[10px] font-bold rounded-full h-5 w-5 flex items-center justify-center shadow-sm">
                      {cartItemCount}
                    </span>
                  )}
                </Link>

                {/* Desktop User Menu */}
                <div className="hidden md:flex items-center gap-4 border-l border-gray-200 dark:border-gray-700 pl-6">
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-200">
                    <UserIcon className="w-4 h-4 text-gray-600 dark:text-gray-200" />
                    <span>{user.email}</span>
                  </div>
                  <Link to="/orders" className="text-sm font-medium text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 transition-colors">
                    My Orders
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-1 text-sm font-medium text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </div>
              </>
            ) : (
              <div className="hidden md:flex items-center gap-4">
                <Link
                  to="/login"
                  className="text-gray-600 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 font-medium text-sm transition-colors"
                >
                  Log in
                </Link>
                <Link
                  to="/register"
                  className="bg-indigo-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-indigo-700 transition-colors shadow-sm"
                >
                  Sign up
                </Link>
              </div>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-md text-gray-600 dark:text-gray-200 hover:text-gray-600 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 px-4 pt-2 pb-4 space-y-4">
          <div className="relative w-full group mt-2">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-600 dark:text-gray-200" />
            </div>
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="block w-full pl-10 pr-3 py-2 border border-gray-200 dark:border-gray-700 rounded-full bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {user ? (
            <div className="space-y-3 pt-2 border-t border-gray-100 dark:border-gray-800">
              <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-white font-medium">
                <UserIcon className="w-4 h-4 text-gray-600 dark:text-gray-200" />
                {user.email}
              </div>
              <Link
                to="/orders"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full flex justify-center items-center gap-2 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 px-4 py-2 rounded-full text-sm font-medium transition-colors"
              >
                <Package className="w-4 h-4" />
                My Orders
              </Link>
              <button
                onClick={handleLogout}
                className="w-full flex justify-center items-center gap-2 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 px-4 py-2 rounded-full text-sm font-medium transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-2 pt-2 border-t border-gray-100 dark:border-gray-800">
              <Link
                to="/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full text-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-full text-gray-700 dark:text-white font-medium hover:bg-gray-50 dark:hover:bg-gray-800"
              >
                Log in
              </Link>
              <Link
                to="/register"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full text-center bg-indigo-600 text-white px-4 py-2 rounded-full font-medium hover:bg-indigo-700"
              >
                Sign up
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
