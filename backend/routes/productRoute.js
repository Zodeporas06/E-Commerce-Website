const express = require("express");
const {getAllProducts, createProduct, updateProducts} = require("../controllers/productController.js");

const router = express.Router();

//Product Routes
router.route("/products").get(getAllProducts);
router.route("/product/new").post(createProduct);
router.route("/product/:id").put(updateProducts);

module.exports = router;