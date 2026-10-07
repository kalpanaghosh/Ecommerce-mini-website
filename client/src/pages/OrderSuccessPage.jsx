import { useNavigate, useLocation } from 'react-router-dom';
import { CheckCircle, Home } from 'lucide-react';

const OrderSuccessPage = () => {

  const navigate = useNavigate();
  const location = useLocation();

  const orderTotal = location.state?.total || 0;

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gray-50 dark:bg-gray-950 flex items-center justify-center px-4 py-6">
      <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-lg border border-gray-100 dark:border-gray-800 p-6 md:p-8 max-w-md w-full text-center">
        {/* Success Icon */}
        <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">          <CheckCircle className="w-10 h-10 md:w-12 md:h-12 text-green-500" />
        </div>

        {/* Heading */}
        <h1 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white mb-4 leading-tight">Order Confirmed!
        </h1>

        {/* Text */}
        <p className="text-gray-600 dark:text-gray-400 text-base md:text-lg leading-relaxed mb-8">
          Thank you for your purchase.
          <br />
          Your order has been placed successfully.
          <br />
          (This is a dummy checkout page)
        </p>

        {/* Amount Box */}
        <div className="bg-gray-50 dark:bg-gray-800 rounded-3xl p-4 md:p-5 text-left mb-6">
          <p className="text-gray-500 dark:text-gray-400 text-lg mb-3">
            Order Total
          </p>

          <h2 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white">
            ₹{orderTotal}
          </h2>
        </div>

        {/* Button */}
        <button
          onClick={() => navigate('/')}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-2xl text-lg md:text-xl font-bold transition-all shadow-lg"        >
          <div className="flex items-center justify-center gap-3">
            <Home className="w-6 h-6" />
            Back to Home
          </div>
        </button>

      </div>
    </div>
  );
};
export default OrderSuccessPage;