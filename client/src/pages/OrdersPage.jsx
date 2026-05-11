import { useState, useEffect } from 'react';
import api from '../api/axios';
import { Package, Calendar, MapPin, Phone, User, ChevronRight, Loader2, ShoppingBag, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const { data } = await api.get('/order');
      setOrders(data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-950">
        <Loader2 className="w-10 h-10 animate-spin text-indigo-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
          <div>
            <h1 className="text-4xl font-black text-gray-900 dark:text-white tracking-tight flex items-center gap-3">
              <Package className="w-10 h-10 text-indigo-600" />
              My Orders
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-2 font-medium">Track and manage your recent purchases</p>
          </div>
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold hover:underline group"
          >
            Continue Shopping
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {orders.length === 0 ? (
          <div className="bg-white dark:bg-gray-900 rounded-[2rem] p-16 text-center border border-gray-100 dark:border-gray-800 shadow-xl dark:shadow-none">
            <div className="w-24 h-24 bg-indigo-50 dark:bg-indigo-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="w-12 h-12 text-indigo-400 dark:text-indigo-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">No orders found yet</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-10 max-w-md mx-auto text-lg">Looks like you haven't placed any orders. Start exploring our premium collection today!</p>
            <Link
              to="/"
              className="inline-flex items-center justify-center px-10 py-4 bg-indigo-600 text-white rounded-2xl font-black hover:bg-indigo-700 transition-all hover:scale-105 shadow-lg shadow-indigo-200 dark:shadow-none"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-8">
            {orders.map((order) => (
              <div
                key={order._id}
                className="bg-white dark:bg-gray-900 rounded-[2rem] border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden group hover:shadow-md transition-all duration-300"
              >
                {/* Order Meta Header */}
                <div className="p-6 md:p-8 bg-gray-50/50 dark:bg-gray-800/30 border-b border-gray-100 dark:border-gray-800 flex flex-wrap justify-between items-center gap-6">
                  <div className="grid grid-cols-2 sm:flex sm:gap-10 gap-6">
                    <div>
                      <p className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em] mb-1.5">Order Placed</p>
                      <p className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-indigo-500" />
                        {new Date(order.createdAt).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric'
                        })}
                      </p>
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em] mb-1.5">Total Amount</p>
                      <p className="text-lg font-black text-indigo-600 dark:text-indigo-400">₹{order.totalAmount.toLocaleString('en-IN')}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em] mb-1.5">Status</p>
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-black bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300 uppercase tracking-wider">
                        <Clock className="w-3 h-3 mr-1.5" />
                        {order.status}
                      </span>
                    </div>
                  </div>
                  <div className="text-left sm:text-right">
                    <p className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em] mb-1.5">Order ID</p>
                    <p className="text-xs font-mono text-gray-400 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-lg">#{order._id.toUpperCase()}</p>
                  </div>
                </div>

                {/* Order Body */}
                <div className="p-6 md:p-8">
                  <div className="flex flex-col lg:flex-row gap-10">
                    {/* Items Section */}
                    <div className="flex-grow space-y-6">
                      <h4 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] mb-4">Items Ordered</h4>
                      {order.products.map((item, idx) => (
                        <div key={idx} className="flex gap-6 group/item">
                          <div className="w-20 h-24 flex-shrink-0 bg-gray-50 dark:bg-gray-800 rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-800">
                            <img
                              src={item.productId?.image}
                              alt={item.productId?.title}
                              className="w-full h-full object-cover group-hover/item:scale-110 transition-transform duration-500"
                            />
                          </div>
                          <div className="flex-grow py-1">
                            <h5 className="text-base font-bold text-gray-900 dark:text-white mb-1 group-hover/item:text-indigo-600 transition-colors">
                              {item.productId?.title || 'Product removed'}
                            </h5>
                            <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-1 mb-2">{item.productId?.description}</p>
                            <div className="flex items-center gap-4">
                              <p className="text-sm font-bold text-gray-900 dark:text-white">
                                ₹{item.price.toLocaleString('en-IN')}
                              </p>
                              <span className="text-xs text-gray-400 dark:text-gray-500 bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded-md">
                                Qty: {item.quantity}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Shipping Address Section */}
                    <div className="lg:w-80 flex-shrink-0">
                      <div className="bg-gray-50 dark:bg-gray-800/40 p-6 rounded-[2rem] border border-gray-100 dark:border-gray-800">
                        <h4 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] mb-5 flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-indigo-500" />
                          Delivery Details
                        </h4>
                        <div className="space-y-4">
                          <div className="flex items-start gap-3">
                            <User className="w-4 h-4 text-gray-400 mt-0.5" />
                            <div>
                              <p className="text-sm font-bold text-gray-900 dark:text-white">{order.address.fullName}</p>
                              <p className="text-xs text-gray-500 flex items-center gap-1.5 mt-1">
                                <Phone className="w-3 h-3" />
                                {order.address.phoneNumber}
                              </p>
                            </div>
                          </div>
                          <div className="pl-7">
                            <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed font-medium">
                              {order.address.houseNo},<br />
                              {order.address.landmark && `${order.address.landmark}, `}
                              {order.address.city}, {order.address.state}<br />
                              <span className="font-bold text-gray-900 dark:text-white">Pincode: {order.address.pincode}</span>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersPage;
