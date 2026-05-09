const express = require("express");
const router = express.Router();

router.post("/add", async (req, res) => {
    try {
        res.json({ message: "Wishlist added successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;