const express = require("express");
const {registerUser, loginUser, logoutUser, forgotPassword, resetPassword, getUserDetails, updatePassword, updateUserProfile, getAllUsersAdmin, getUserDetailsAdmin, deleteUser} = require("../controllers/userController.js");
const {isAuthenticatedUser, authorizeRoles} = require("../middleware/auth.js");

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);
router.route("/logout").get(logoutUser);

router.route("/me").get(isAuthenticatedUser, getUserDetails);
router.route("/password/update").put(isAuthenticatedUser, updatePassword);
router.route("/me/update").put(isAuthenticatedUser, updateUserProfile);

router.route("/admin/users").get(isAuthenticatedUser, authorizeRoles("admin"), getAllUsersAdmin);
router.route("/admin/user/:id").get(isAuthenticatedUser, authorizeRoles("admin"), getUserDetailsAdmin);
router.route("/admin/user/:id").delete(isAuthenticatedUser, authorizeRoles("admin"), deleteUser);

module.exports = router;