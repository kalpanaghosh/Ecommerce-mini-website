const express = require('express');
const router = express.Router();
const { getAddresses, addAddress } = require('../controllers/addressController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', protect, getAddresses);
router.post('/', protect, addAddress);

module.exports = router;
