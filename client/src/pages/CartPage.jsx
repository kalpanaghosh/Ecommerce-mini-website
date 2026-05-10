import { useCart } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';

const CartPage = () => {
  const { cart, updateQuantity, removeFromCart, cartTotal } = useCart();
  const navigate = useNavigate();

  if (!cart || !cart.products || cart.products.length === 0) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-gray-50 dark:bg-gray-900 transition-colors duration-300 py-12 px-4">
        <div className="text-center bg-white dark:bg-gray-800 p-12 rounded-3xl shadow-xl dark:shadow-none border border-gray-100 dark:border-gray-700 max-w-md w-full">
          <div className="w-24 h-24 bg-indigo-50 dark:bg-indigo-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingBag className="w-12 h-12 text-indigo-400 dark:text-indigo-500" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Your cart is empty</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8 text-lg">Looks like you haven't added anything to your bag yet.</p>
          <Link
            to="/"
            className="inline-flex items-center justify-center px-10 py-4 border border-transparent text-lg font-bold rounded-2xl text-white bg-indigo-600 hover:bg-indigo-700 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-indigo-200 dark:shadow-none"
          >
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-8">Shopping Cart</h1>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items List */}
          <div className="flex-1">
            <div className="bg-white dark:bg-gray-800 shadow-sm rounded-3xl border border-gray-100 dark:border-gray-700 overflow-hidden">
              <ul className="divide-y divide-gray-100">
                {cart.products.map((item) => {
                  const product = item.productId;
                  if (!product) return null; // In case product was deleted
                  return (
                    <li key={product._id} className="p-6 flex flex-col sm:flex-row gap-6 hover:bg-gray-50/50 dark:hover:bg-white/5 transition-colors">
                      <div className="sm:w-32 h-32 flex-shrink-0 overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-700">
                        <img
                          src={product.image}
                          alt={product.title}
                          className="h-full w-full object-cover object-center"
                        />
                      </div>

                      <div className="flex flex-1 flex-col justify-between">
                        <div className="flex justify-between items-start gap-4">
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white line-clamp-1">
                              <Link to={`/product/${product._id}`} className="hover:text-indigo-600 transition-colors">
                                {product.title}
                              </Link>
                            </h3>
                            <p className="mt-1 text-sm text-gray-600 dark:text-gray-200 line-clamp-2">{product.description}</p>

                          </div>
                          <p className="text-lg font-bold text-gray-900 dark:text-white dark:text-white whitespace-nowrap">
                            ₹{product.price.toLocaleString('en-IN')}
                          </p>
                        </div>

                        <div className="flex items-center justify-between mt-4">
                          <div className="flex items-center border border-gray-200 dark:border-gray-700 rounded-lg p-1 bg-white dark:bg-gray-800">
                            <button
                              onClick={() => updateQuantity(product._id, item.quantity - 1)}
                              className="p-1 hover:bg-gray-100 rounded text-gray-800 dark:text-gray-200 transition-colors"
                              disabled={item.quantity <= 1}
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="w-10 text-center font-medium text-gray-900 dark:text-white text-sm">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(product._id, item.quantity + 1)}
                              className="p-1 hover:bg-gray-100 rounded text-gray-600 dark:text-gray-200 transition-colors"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>

                          <button
                            type="button"
                            onClick={() => removeFromCart(product._id)}
                            className="flex items-center gap-1.5 text-sm font-medium text-red-500 hover:text-red-600 bg-red-50 hover:bg-red-100 px-3 py-2 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                            <span>Remove</span>
                          </button>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:w-96 flex-shrink-0">
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 p-8 sticky top-24">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Order Summary</h2>

              <div className="space-y-4 text-sm text-gray-900 mb-6 border-b border-gray-100 pb-6">
                <div className="flex justify-between dark:text-gray-300">
                  <p>Subtotal</p>
                  <p className="font-medium text-gray-900 dark:text-white">₹{cartTotal.toLocaleString('en-IN')}</p>
                </div>
                <div className="flex justify-between dark:text-gray-300">
                  <p>Shipping</p>
                  <p className="font-medium text-green-600">Free</p>
                </div>
                <div className="flex justify-between dark:text-gray-300">
                  <p>Tax (5%)</p>
                  <p className="font-medium text-gray-900 dark:text-white">₹{(cartTotal * 0.05).toLocaleString('en-IN')}</p>
                </div>
              </div>

              <div className="flex items-center justify-between mb-8">
                <p className="text-base font-bold text-gray-900 dark:text-white">Total</p>
                <p className="text-2xl font-black text-indigo-600 dark:text-indigo-400">
                  ₹{(cartTotal + cartTotal * 0.05).toLocaleString('en-IN')}
                </p>
              </div>

              <button
                onClick={() => navigate('/checkout')}
                className="w-full flex justify-center items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white py-4 px-4 rounded-xl text-lg font-semibold shadow-md shadow-indigo-200 transition-all hover:-translate-y-0.5"
              >
                Proceed to Checkout
                <ArrowRight className="w-5 h-5" />
              </button>

              <div className="mt-6 text-center">
                <Link to="/" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
