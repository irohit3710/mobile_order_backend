const mongoose = require("mongoose");
const Product = require("../models/product.model");

/* post a single product */
const addProductController = async (req, res) => {
    console.log({ ...req.body });
    try {
        const product = await Product.create({
            ...req.body,
        });
        res.status(200).json({ product });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

/* get all products */
const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json(products);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

/* get a single product */
const getSingleProduct = async (req, res) => {
    const { id } = req.params;
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ error: "invalid id" });
        }
        const singleProduct = await Product.findById(id);
        if (!singleProduct) {
            return res.status(404).json({ error: "product not found" });
        }

        res.status(200).json(singleProduct);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


//search product
const getProductSearch = async (req, res) => {
    try {
        const { searchTerm } = req.params;
        if (!searchTerm) {
            return res.status(400).json({ error: "Search term is required" });
        }

        const regex = new RegExp(searchTerm, "i"); // "i" for case-insensitive

        const results = await Product.find({
            $or: [
                { name: regex },
                { os: regex },
                { pro: regex },
                { mem: regex },
            ],
        });

        res.json(results);
    } catch (error) {
        console.error("Error searching for products:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}
module.exports = {
    addProductController,
    getAllProducts,
    getSingleProduct,
    getProductSearch
};
