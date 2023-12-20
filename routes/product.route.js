const express = require("express");

const {
  addProductController,
  getAllProducts,
  getSingleProduct,
  getProductSearch,
} = require("../controllers/addProductController.controller");

/* create router */
const router = express.Router();

/* routes */
router.post("/", addProductController);
router.get("/", getAllProducts);
router.get("/:id", getSingleProduct);
router.get("/search/:searchTerm",getProductSearch);
module.exports = router;
