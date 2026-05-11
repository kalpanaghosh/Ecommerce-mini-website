const Address = require('../models/Address');

exports.getAddresses = async (req, res) => {
  try {
    const addresses = await Address.find({
      userId: req.user.id
    });

    res.json(addresses);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message
    });
  }
};

exports.addAddress = async (req, res) => {
  try {
    const {
      fullName,
      phoneNumber,
      pincode,
      state,
      city,
      houseNo,
      landmark
    } = req.body;

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
    console.log(error);
    res.status(500).json({
      message: error.message
    });
  }
};
exports.deleteAddress = async (req, res) => {
  try {
    const address = await Address.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!address) {
      return res.status(404).json({ message: "Address not found" });
    }

    res.json({ message: "Address deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};