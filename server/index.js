const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Import routes
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');
const cartRoutes = require('./routes/cart');
const wishlistRoutes = require('./routes/wishlist');
const addressRoutes = require('./routes/address');
const orderRoutes = require('./routes/order');

dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: "*",
  credentials: true
}));
app.use(express.json());

// Database Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/wishlist', wishlistRoutes);
app.use('/api/address', addressRoutes);
app.use('/api/order', orderRoutes);

// Base route
app.get('/', (req, res) => {
  res.send('Mini E-Commerce API is running...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
