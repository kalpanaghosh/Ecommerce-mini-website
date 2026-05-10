const Cart = require('../models/Cart');

exports.getCart = async (req, res) => {
  try {
    let cart = await Cart.findOne({ userId: req.user.id }).populate('products.productId');

    if (!cart) {
      cart = await Cart.create({ userId: req.user.id, products: [] });
    }

    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.addToCart = async (req, res) => {
  try {
    const { productId, quantity, variant } = req.body;
    let cart = await Cart.findOne({ userId: req.user.id });

    if (!cart) {
      cart = await Cart.create({ userId: req.user.id, products: [] });
    }

    const existingProductIndex = cart.products.findIndex(p => p.productId.toString() === productId && p.variant === variant);

    if (existingProductIndex >= 0) {
      cart.products[existingProductIndex].quantity += quantity || 1;
    } else {
      cart.products.push({ productId, quantity: quantity || 1 });
    }

    await cart.save();
    const updatedCart = await Cart.findOne({ userId: req.user.id }).populate('products.productId');
    res.status(201).json(updatedCart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateCartQuantity = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const cart = await Cart.findOne({ userId: req.user.id });

    if (cart) {
      const productIndex = cart.products.findIndex(p => p.productId.toString() === productId);

      if (productIndex >= 0) {
        if (quantity <= 0) {
          cart.products.splice(productIndex, 1);
        } else {
          cart.products[productIndex].quantity = quantity;
        }
        await cart.save();
        const updatedCart = await Cart.findOne({ userId: req.user.id }).populate('products.productId');
        return res.json(updatedCart);
      }
    }

    res.status(404).json({ message: 'Cart or product not found' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.removeFromCart = async (req, res) => {
  try {
    const productId = req.params.id;
    const cart = await Cart.findOne({ userId: req.user.id });

    if (cart) {
      cart.products = cart.products.filter(p => p.productId.toString() !== productId);
      await cart.save();
      const updatedCart = await Cart.findOne({ userId: req.user.id }).populate('products.productId');
      return res.json(updatedCart);
    }

    res.status(404).json({ message: 'Cart not found' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.clearCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user.id });

    if (!cart) {
      return res.json({ products: [] });
    }

    cart.products = [];
    cart.markModified('products');
    await cart.save();


    const updatedCart = await Cart.findOne({
      userId: req.user.id
    }).populate('products.productId');

    res.json(updatedCart);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};




