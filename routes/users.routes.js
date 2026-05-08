const express = require("express");
const router = express.Router();

const userController = require("../controllers/user.controllers");

// get all users
router.route("/").get(userController.getAllUsers);

// register
router.route("/register").post(userController.register);

// login
router.route("/login").post(userController.login);

module.exports = router;
