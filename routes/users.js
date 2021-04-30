/** @format */

const express = require("express");
const router = express.Router();

// const authenticateToken = require("../auths/auth");
// const { userLogin, userSignup } = require("../controllers/users");

const userController = require("../controllers/users");

// API Endpoint for /User/login
router.post("/login", userController.userLogin);

// API Endpoint for /Users/signup
router.post("/signup", userController.userSignup);

module.exports = router;
