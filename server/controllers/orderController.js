const Order = require('../models/Order');

exports.placeOrder = async (req, res) => {
  try {
    const { products, totalAmount, address } = req.body;

    const newOrder = new Order({
      userId: req.user.id,
      products,
      totalAmount,
      address,
      status: 'Processing'
    });

    await newOrder.save();

    res.status(201).json(newOrder);

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message
    });
  }
};

exports.getOrders = async (req, res) => {
  try {

    const orders = await Order.find({
      userId: req.user.id
    })
      .populate('products.productId')
      .sort({ createdAt: -1 });

    res.json(orders);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message
    });
  }
};