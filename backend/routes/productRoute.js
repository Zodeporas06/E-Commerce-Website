const express = require("express");
const {
  getAllProducts,
  createProduct,
  updateProducts,
  deleteProduct,
  getProductDetails,
  createProductReview,
} = require("../controllers/productController.js");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth.js");

const router = express.Router();

//Product Routes
router.route("/products").get(getAllProducts);
router.route("/admin/product/new").post(isAuthenticatedUser, authorizeRoles("admin"), createProduct);
router
  .route("/admin/product/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateProducts)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteProduct)

router.route("/product/:id").get(getProductDetails);

router.route("/review").put(isAuthenticatedUser, createProductReview);

module.exports = router;
