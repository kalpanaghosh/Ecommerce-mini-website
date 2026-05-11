const Address = require('../models/Address');

exports.getAddresses = async (req, res) => {
  try {
    const addresses = await Address.find({ userId });
    res.json(addresses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.addAddress = async (req, res) => {
  try {
    const { fullName, phoneNumber, pincode, state, city, houseNo, landmark } = req.body;
    const newAddress = new Address({
      userId: req.user.id,
      fullName,
      phoneNumber,
      pincode,
      state,
      city,
      houseNo,
      landmark
    });
    await newAddress.save();
    res.status(201).json(newAddress);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
