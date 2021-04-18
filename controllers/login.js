/** @format */

// Import jwt from node_modules (Using jwt)
const jwt = require("jsonwebtoken");

// Access Environment variables
const TOKEN_SECRET = process.env.TOKEN_SECRET || "asdl4u47jj4dj";

// Import Middleware function to authenticate token From different file
const authenticateToken = require("../helpers/auth");

// Import generateAccessToken function to generate Token for the user
const generateAccessToken = require("../helpers/geneToken");

// Create User model just by requiring the User
const User = require("../models/User");

/***  
		API Endpoint for login
    find the user with the given email and password in the database if the user is valid (been funded in DB) Generate AccessToken to the user and return the AccessToken to the front-end but if the user is not found then return 404 status: "Not Found"
		Call (authenticateToken) Middleware function first
		This is now a protected route
*/
const login =
	(authenticateToken,
	(req, res) => {
		// JavaScript object containing the parse JSON
		// console.log(req.body);
		const email = req.body.email;
		const password = req.body.password;

		// Finds one document. // using callback
		// Find one user whose `email` is 'given email', and `password` is 'given password' otherwise `null`
		//checking to make sure the user entered the correct username/password
		User.findOne({ email: email, password: password }, (err, user) => {
			if (user) {
				{
					//If token is successfully verified, we can send the autorized data
					// generate a JWT token for the user
					const token = generateAccessToken(user);
					console.log("The AccessToken is : ", token);
					res.status(200).send({
						message: "Successful log in",
						status: "valid",
						token: token, // return token back to the fron-End
					});
					console.log("SUCCESS: Connected to protected route");
				}
			} else {
				console.log("ERROR: Could not log in");
				res.status(404).send({
					status: "Not Found",
				});
			}
		});
	});

module.exports = login;
