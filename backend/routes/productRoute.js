const express = require("express");
const {getAllProducts, createProduct, updateProducts, deleteProduct, getProductDetails} = require("../controllers/productController.js");
const { isAuthenticatedUser } = require("../middleware/auth.js");

const router = express.Router();

//Product Routes
router.route("/products").get(isAuthenticatedUser, getAllProducts);
router.route("/product/new").post(createProduct);
router.route("/product/:id").put(updateProducts).delete(deleteProduct).get(getProductDetails);

module.exports = router;