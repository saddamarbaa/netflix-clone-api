/** @format */

const express = require("express");
const router = express.Router();

const authenticateToken = require("../auths/auth");
const { userLogin, userSignup } = require("../controllers/users");

// API Endpoint for /User/login
router.post("/login", userLogin);

// API Endpoint for /Users/signup
router.post("/signup", userSignup);

module.exports = router;
