const Wishlist = require('../models/Wishlist');
const Product = require('../models/Product');

// @desc    Get user wishlist
// @route   GET /api/wishlist
// @access  Private
exports.getWishlist = async (req, res) => {
  try {
    let wishlist = await Wishlist.findOne({ userId: req.user.id }).populate('products');
    
    if (!wishlist) {
      wishlist = await Wishlist.create({ userId: req.user.id, products: [] });
    }

    res.json(wishlist);
  } catch (error) {
    console.error('Error in getWishlist:', error);
    res.status(500).json({ message: 'Server Error: ' + error.message });
  }
};

// @desc    Add product to wishlist
// @route   POST /api/wishlist/add
// @access  Private
exports.addToWishlist = async (req, res) => {
  try {
    const { productId } = req.body;

    // Validate product existence
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    let wishlist = await Wishlist.findOne({ userId: req.user.id });

    if (!wishlist) {
      wishlist = await Wishlist.create({ userId: req.user.id, products: [] });
    }

    // Check for duplicates
    if (wishlist.products.includes(productId)) {
      return res.status(400).json({ message: 'Product already in wishlist' });
    }

    wishlist.products.push(productId);
    await wishlist.save();

    const updatedWishlist = await Wishlist.findOne({ userId: req.user.id }).populate('products');
    res.status(201).json(updatedWishlist);
  } catch (error) {
    console.error('Error in addToWishlist:', error);
    res.status(500).json({ message: 'Server Error: ' + error.message });
  }
};

// @desc    Remove product from wishlist
// @route   DELETE /api/wishlist/remove/:id
// @access  Private
exports.removeFromWishlist = async (req, res) => {
  try {
    const productId = req.params.id;
    let wishlist = await Wishlist.findOne({ userId: req.user.id });

    if (!wishlist) {
      return res.status(404).json({ message: 'Wishlist not found' });
    }

    // Remove product
    wishlist.products = wishlist.products.filter(
      (p) => p.toString() !== productId
    );
    
    await wishlist.save();
    const updatedWishlist = await Wishlist.findOne({ userId: req.user.id }).populate('products');
    res.json(updatedWishlist);
  } catch (error) {
    console.error('Error in removeFromWishlist:', error);
    res.status(500).json({ message: 'Server Error: ' + error.message });
  }
};
