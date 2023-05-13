const express = require("express");

const {newOrder, getOrderDetails, getMyOrders, getAllOrders} = require("../controllers/orderController.js");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth.js");

const router = express.Router();

router.route("/order/new").post(isAuthenticatedUser, newOrder);
router.route("/order/:id").get(isAuthenticatedUser, getOrderDetails);
router.route("/me/order").get(isAuthenticatedUser, getMyOrders);
router.route("/admin/orders").get(isAuthenticatedUser, authorizeRoles("admin"), getAllOrders);

module.exports = router;