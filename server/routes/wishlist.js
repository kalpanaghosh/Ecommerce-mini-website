const express = require('express');
const router = express.Router();
const { 
  getWishlist, 
  addToWishlist, 
  removeFromWishlist 
} = require('../controllers/wishlistController');
const { protect } = require('../middleware/authMiddleware');

router.use(protect); // All wishlist routes are protected

router.get('/', getWishlist);
router.post('/add', addToWishlist);
router.delete('/remove/:id', removeFromWishlist);

module.exports = router;
