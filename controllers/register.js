/** @format */

// Create User model just by requiring the User
const User = require("../models/User");

// API Endpoint for register
const register = (req, res) => {
	const newUser = new User({
		name: req.body.name,
		email: req.body.email,
		password: req.body.password,
	});

	// Save model to database , passing a callback
	newUser.save((err, user) => {
		if (err) {
			//if user already exist(already been register)
			console.log("unable to save to database");
			console.log(err);
			res.status(400).send({
				status: err,
			});
		} else {
			console.log("item saved to database");
			// console.log(User);
			res.status(200).send({
				status: "registered",
			});
		}
	});
};

module.exports = register;
