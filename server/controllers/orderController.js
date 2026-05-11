const Order = require('../models/Order');
const Cart = require('../models/Cart');

exports.placeOrder = async (req, res) => {
  try {
    const { address, totalAmount, products } = req.body;

    if (!address) {
      return res.status(400).json({ message: 'Delivery address is required' });
    }

    const newOrder = new Order({
      userId: req.user.id,
      products,
      address,
      totalAmount
    });

    await newOrder.save();

    // Clear cart after order is placed
    await Cart.findOneAndUpdate({ userId: req.user.id }, { products: [] });

    res.status(201).json({ message: 'Order placed successfully', orderId: newOrder._id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
