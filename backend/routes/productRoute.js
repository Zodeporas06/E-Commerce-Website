const express = require("express");
const {getAllProducts, createProduct, updateProducts, deleteProduct} = require("../controllers/productController.js");

const router = express.Router();

//Product Routes
router.route("/products").get(getAllProducts);
router.route("/product/new").post(createProduct);
router.route("/product/:id").put(updateProducts).delete(deleteProduct);

module.exports = router;