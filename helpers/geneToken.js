/** @format */

// Import jwt from node_modules (Using jwt)
const jwt = require("jsonwebtoken");

// Access Environment variables
const TOKEN_SECRET = process.env.TOKEN_SECRET || "asdl4u47jj4dj";

// Import Middleware function to authenticate token From different file
const authenticateToken = require("../helpers/auth");

// Create User model just by requiring the User
const User = require("../models/User");

// function for Generating Token
const generateAccessToken = (user) => {
	const payload = {
		id: user.id,
		name: user.name,
	};

	// expires after3 hours (10800 seconds)
	return jwt.sign(payload, TOKEN_SECRET, { expiresIn: "10800s" });
};

module.exports = generateAccessToken;
