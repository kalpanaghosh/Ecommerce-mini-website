const mongoose = require('mongoose');

// Product schema for the e-commerce store
const ProductSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    default: 'Uncategorized',
  },
  // Optional rating field (1-5 scale)
  rating: {
    type: Number,
    default: 4.0,
    min: 1,
    max: 5,
  },
}, { timestamps: true });

module.exports = mongoose.model('Product', ProductSchema);
