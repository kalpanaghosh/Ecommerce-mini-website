import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';

import { ThemeProvider } from './context/ThemeContext';
import { WishlistProvider } from './context/WishlistContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';
import ScrollToTop from './components/ScrollToTop';

import HomePage from './pages/HomePage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import CartPage from './pages/CartPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderSuccessPage from './pages/OrderSuccessPage';
import WishlistPage from './pages/WishlistPage';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <ThemeProvider>
        <AuthProvider>
          <CartProvider>
            <WishlistProvider>
              <div className="min-h-screen flex flex-col bg-white dark:bg-gray-800 text-black dark:bg-gray-950 dark:text-white font-sans transition-all duration-300">
                <Navbar />
                <main className="flex-grow">
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/product/:id" element={<ProductDetailsPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route
                      path="/cart"
                      element={
                        <ProtectedRoute>
                          <CartPage />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/checkout"
                      element={
                        <ProtectedRoute>
                          <CheckoutPage />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/order-success"
                      element={
                        <ProtectedRoute>
                          <OrderSuccessPage />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/wishlist"
                      element={
                        <ProtectedRoute>
                          <WishlistPage />
                        </ProtectedRoute>
                      }
                    />
                  </Routes>
                </main>
                <Footer />
                <BackToTop />
                <ToastContainer position="bottom-right" autoClose={3000} theme="colored" />
              </div>
            </WishlistProvider>
          </CartProvider>
        </AuthProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;
