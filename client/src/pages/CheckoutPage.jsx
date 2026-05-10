import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { CheckCircle } from 'lucide-react';

const CheckoutPage = () => {
  const { cartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  useEffect(() => {
    clearCart();
  }, []);

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-gray-50 dark:bg-gray-900 transition-colors duration-300">

      <div className="max-w-md w-full bg-white dark:bg-gray-800 p-10 rounded-3xl shadow-sm border border-gray-100 text-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-10 h-10 text-green-500" />
        </div>
        <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-2">Order Confirmed!</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-8">
          Thank you for your purchase. Your order has been placed successfully.
          <br />(This is a dummy checkout page)
        </p>

        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 mb-8 text-left">
          <p className="text-sm text-gray-700 dark:text-gray-300 mb-1">Order Total</p>
          <p className="text-2xl font-bold text-black dark:text-white">₹{(cartTotal + cartTotal * 0.05).toLocaleString('en-IN')}</p>
        </div>

        <button
          onClick={async () => {
            await clearCart();
            navigate('/');
          }}
          className="w-full bg-indigo-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-indigo-700 transition-colors"
        >
          Back to Home
        </button>
      </div>
    </div >
  );
};

export default CheckoutPage;
