const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

router.get("/search", async (req, res) => {
  try {
    const searchTerm = req.query.searchTerm;

    if (!searchTerm) {
      return res.status(400).json({ error: "Search term is required" });
    }

    const regex = new RegExp(searchTerm, "i"); // "i" for case-insensitive

    const results = await Product.find({
      $or: [
        { name: regex },
        { os: regex },
        { processor: regex },
        { mem: regex },
      ],
    });

    res.json(results);
  } catch (error) {
    console.error("Error searching for products:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
