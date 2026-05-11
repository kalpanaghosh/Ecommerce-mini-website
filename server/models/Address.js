const mongoose = require('mongoose');

const AddressSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    validate: {
      validator: function(v) {
        return /^\d{10}$/.test(v);
      },
      message: props => `${props.value} is not a valid 10-digit phone number!`
    }
  },
  pincode: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  houseNo: {
    type: String,
    required: true,
  },
  landmark: {
    type: String,
  },
}, { timestamps: true });

module.exports = mongoose.model('Address', AddressSchema);
