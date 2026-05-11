import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import api from '../api/axios';
import { toast } from 'react-toastify';
import { MapPin, Phone, User, Home, Plus, Check, Loader2 } from 'lucide-react';

const CheckoutPage = () => {
  const { cart, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    pincode: '',
    state: '',
    city: '',
    houseNo: '',
    landmark: '',
  });

  useEffect(() => {
    if (!cart || cart.products.length === 0) {
      navigate('/cart');
      return;
    }
    fetchAddresses();
  }, [cart, navigate]);

  const fetchAddresses = async () => {
    setLoading(true);
    try {
      const { data } = await api.get('/address');
      setAddresses(data);
      if (data.length > 0) {
        setSelectedAddress(data[0]);
      } else {
        setShowAddressForm(true);
      }
    } catch (error) {
      console.error('Error fetching addresses:', error);
      toast.error('Failed to load addresses');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    if (!formData.fullName || !formData.phoneNumber || !formData.pincode || !formData.state || !formData.city || !formData.houseNo) {
      toast.error('Please fill all required fields');
      return false;
    }
    if (!/^\d{10}$/.test(formData.phoneNumber)) {
      toast.error('Please enter a valid 10-digit phone number');
      return false;
    }
    return true;
  };

  const handleAddAddress = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setSubmitting(true);
    try {
      const { data } = await api.post('/address', formData);
      setAddresses([...addresses, data]);
      setSelectedAddress(data);
      setShowAddressForm(false);
      setFormData({
        fullName: '',
        phoneNumber: '',
        pincode: '',
        state: '',
        city: '',
        houseNo: '',
        landmark: '',
      });
      toast.success('Address added successfully');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to add address');
    } finally {
      setSubmitting(false);
    }
  };

  const handlePlaceOrder = async () => {
    if (!selectedAddress) {
      toast.error('Please select a delivery address');
      return;
    }

    setSubmitting(true);
    try {
      const orderData = {
        address: selectedAddress,
        totalAmount: cartTotal + cartTotal * 0.05, // Including 5% tax/shipping dummy
        products: cart.products.map(item => ({
          productId: item.productId._id,
          quantity: item.quantity,
          price: item.productId.price
        }))
      };

      await api.post('/order', orderData);
      await clearCart();
      toast.success('Order placed successfully! 🎉');
      navigate('/order-success');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to place order');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center dark:bg-gray-900">
        <Loader2 className="w-10 h-10 animate-spin text-indigo-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-8">Checkout</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Address Selection */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-indigo-600" />
                  Delivery Address
                </h2>
                {!showAddressForm && (
                  <button
                    onClick={() => setShowAddressForm(true)}
                    className="text-sm font-medium text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
                  >
                    <Plus className="w-4 h-4" />
                    Add New Address
                  </button>
                )}
              </div>

              {showAddressForm ? (
                <form onSubmit={handleAddAddress} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="relative">
                      <User className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        name="fullName"
                        placeholder="Full Name"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all dark:text-white"
                        required
                      />
                    </div>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                      <input
                        type="tel"
                        name="phoneNumber"
                        placeholder="10-digit Mobile Number"
                        value={formData.phoneNumber}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all dark:text-white"
                        required
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <input
                      type="text"
                      name="pincode"
                      placeholder="Pincode"
                      value={formData.pincode}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all dark:text-white"
                      required
                    />
                    <input
                      type="text"
                      name="city"
                      placeholder="City"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all dark:text-white"
                      required
                    />
                    <input
                      type="text"
                      name="state"
                      placeholder="State"
                      value={formData.state}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all dark:text-white"
                      required
                    />
                  </div>
                  <div className="relative">
                    <Home className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      name="houseNo"
                      placeholder="House No / Area / Street"
                      value={formData.houseNo}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all dark:text-white"
                      required
                    />
                  </div>
                  <input
                    type="text"
                    name="landmark"
                    placeholder="Landmark (Optional)"
                    value={formData.landmark}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all dark:text-white"
                  />
                  <div className="flex gap-4 pt-2">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="flex-1 bg-indigo-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-indigo-700 transition-colors disabled:opacity-50"
                    >
                      {submitting ? 'Saving...' : 'Save and Use This Address'}
                    </button>
                    {addresses.length > 0 && (
                      <button
                        type="button"
                        onClick={() => setShowAddressForm(false)}
                        className="flex-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 px-6 py-3 rounded-xl font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </form>
              ) : (
                <div className="space-y-4">
                  {addresses.map((addr) => (
                    <div
                      key={addr._id}
                      onClick={() => setSelectedAddress(addr)}
                      className={`relative p-5 rounded-2xl border-2 transition-all cursor-pointer ${
                        selectedAddress?._id === addr._id
                          ? 'border-indigo-600 bg-indigo-50/50 dark:bg-indigo-900/10'
                          : 'border-gray-100 dark:border-gray-700 hover:border-gray-200 dark:hover:border-gray-600'
                      }`}
                    >
                      {selectedAddress?._id === addr._id && (
                        <div className="absolute top-4 right-4 w-6 h-6 bg-indigo-600 rounded-full flex items-center justify-center">
                          <Check className="w-4 h-4 text-white" />
                        </div>
                      )}
                      <p className="font-bold text-gray-900 dark:text-white text-lg mb-1">{addr.fullName}</p>
                      <p className="text-gray-600 dark:text-gray-400 mb-2 flex items-center gap-2">
                        <Phone className="w-4 h-4" /> {addr.phoneNumber}
                      </p>
                      <p className="text-gray-600 dark:text-gray-400">
                        {addr.houseNo}, {addr.landmark && `${addr.landmark}, `}
                        {addr.city}, {addr.state} - {addr.pincode}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 sticky top-24">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Price ({cart?.products?.length} items)</span>
                  <span>₹{cartTotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Delivery Charges</span>
                  <span className="text-green-500 font-medium">FREE</span>
                </div>
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Tax (5%)</span>
                  <span>₹{(cartTotal * 0.05).toLocaleString('en-IN')}</span>
                </div>
                <div className="pt-4 border-t border-gray-100 dark:border-gray-700 flex justify-between">
                  <span className="text-lg font-bold text-gray-900 dark:text-white">Total Amount</span>
                  <span className="text-lg font-bold text-indigo-600">₹{(cartTotal + cartTotal * 0.05).toLocaleString('en-IN')}</span>
                </div>
              </div>

              <button
                onClick={handlePlaceOrder}
                disabled={submitting || !selectedAddress || showAddressForm}
                className="w-full bg-indigo-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 dark:shadow-none disabled:opacity-50 disabled:cursor-not-allowed transform active:scale-[0.98]"
              >
                {submitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <Loader2 className="w-5 h-5 animate-spin" /> Processing...
                  </span>
                ) : (
                  'Place Order'
                )}
              </button>
              
              {!selectedAddress && !showAddressForm && (
                <p className="mt-3 text-sm text-red-500 text-center font-medium">
                  Please select or add a delivery address
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
