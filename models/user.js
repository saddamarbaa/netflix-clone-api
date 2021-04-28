/** @format */
const mongoose = require("mongoose");
const { Schema } = mongoose;

// Defining a Model and Creating a Database Schema
// define user a schema
const userSchema = new Schema({
	name: {
		type: String,
	},
	email: {
		type: String,
		required: true,
		unique: true, // `email` must be unique
		index: true,
		// a regular expression to validate an email address(stackoverflow)
		match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
	},
	password: {
		type: String,
		min: 3,
		max: 10,
		required: true,
	},
});

// Export model
// Compile model from schema
module.exports = mongoose.model("User", userSchema);
