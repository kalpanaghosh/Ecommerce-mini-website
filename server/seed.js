/**
 * seed.js — Seeds 80 products into MongoDB
 * Run: node seed.js
 * This will NOT remove existing products, only adds new ones if they don't exist.
 */

const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');
const products = require('./productData');

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('Connected to MongoDB');

    let addedCount = 0;
    let skippedCount = 0;

    for (const productData of products) {
      // Check if product with same title already exists — do not duplicate
      const exists = await Product.findOne({ title: productData.title });
      if (!exists) {
        await Product.create(productData);
        addedCount++;
        console.log(`✅ Added: ${productData.title}`);
      } else {
        skippedCount++;
        console.log(`⏭️  Skipped (exists): ${productData.title}`);
      }
    }

    const total = await Product.countDocuments();
    console.log(`\n🎉 Seed complete! Added ${addedCount}, skipped ${skippedCount}. Total products in DB: ${total}`);
    process.exit(0);
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });
