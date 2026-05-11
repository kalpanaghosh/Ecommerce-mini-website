const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  products: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      }
    }
  ],
  address: {
    fullName: String,
    phoneNumber: String,
    pincode: String,
    state: String,
    city: String,
    houseNo: String,
    landmark: String,
  },
  totalAmount: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    default: 'Processing',
  }
}, { timestamps: true });

module.exports = mongoose.model('Order', OrderSchema);
