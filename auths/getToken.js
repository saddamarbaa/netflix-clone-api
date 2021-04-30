/** @format */

const jwt = require("jsonwebtoken");
const TOKEN_SECRET = process.env.TOKEN_SECRET || "asdl4u47jj4dj";

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
