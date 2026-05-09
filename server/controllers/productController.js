const Product = require('../models/Product');
const products = require('../productData');

/**
 * GET /api/products — Fetch all products
 * If the database is empty, it auto-seeds with the product data.
 */
exports.getProducts = async (req, res) => {
  try {
    let allProducts = await Product.find({});

    // Auto-seed if the database is empty
    if (allProducts.length === 0) {
      await Product.insertMany(products);
      allProducts = await Product.find({});
      console.log(`Auto-seeded ${allProducts.length} products.`);
    }

    res.json(allProducts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * GET /api/products/:id — Fetch a single product by its ID
 */
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
