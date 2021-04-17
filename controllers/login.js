/** @format */

// Import jwt from node_modules (Using jwt)
const jwt = require("jsonwebtoken");

// Create User model just by requiring the User
const User = require("../models/User");

// function for Generating Token
const generateAccessToken = (user) => {
	const payload = {
		id: user.id,
		name: user.name,
	};
	// expires after 2 days (172800 seconds)
	//  "asdl4u47jj4dj" is the Secret Key
	return jwt.sign(payload, "asdl4u47jj4dj", { expiresIn: "7200s" });
};

/***  
    API Endpoint for login
    find the user with the given email and password in the database if the user is valid (been funded in DB) Generate AccessToken to the user and return the AccessToken to the front-end but if the user is not found then return 404 status: "Not Found"
*/
const login = (req, res) => {
	// JavaScript object containing the parse JSON
	// console.log(req.body);
	const email = req.body.email;
	const password = req.body.password;

	// Finds one document. // using callback
	// Find one user whose `email` is 'given email', and `password` is 'given password' otherwise `null`
	User.findOne({ email: email, password: password }, (err, user) => {
		if (user) {
			{
				const token = generateAccessToken(user);
				console.log("The AccessToken is : ", token);
				res.status(200).send({
					status: "valid",
					token: token, // return token back to the fron-End
				});
			}
		} else {
			res.status(404).send({
				status: "Not Found",
			});
		}
	});
};

module.exports = login;
