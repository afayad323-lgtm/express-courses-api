const express = require("express");
const router = express.Router();

const userController = require("../controllers/user.controllers");
const verifyToken = require("../middleware/authverifytoken");

// get all users
router.route("/").get(verifyToken, userController.getAllUsers);

// register
router.route("/register").post(userController.register);

// login
router.route("/login").post(userController.loginLimiter, userController.login);

module.exports = router;
