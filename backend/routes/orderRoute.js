const express = require("express");

const {newOrder} = require("../controllers/orderController.js");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth.js");

const router = express.Router();

router.route("/order/new").post(isAuthenticatedUser, newOrder);

module.exports = router;