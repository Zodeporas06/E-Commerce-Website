const express = require("express");

const {newOrder, getOrderDetails} = require("../controllers/orderController.js");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth.js");

const router = express.Router();

router.route("/order/new").post(isAuthenticatedUser, newOrder);
router.route("/order/:id").get(getOrderDetails);

module.exports = router;