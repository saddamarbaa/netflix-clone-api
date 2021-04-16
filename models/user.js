/** @format */

// Import the mongoose module from node_modules
const mongoose = require("mongoose");

// Grab The Schema Object from mongoose
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
	},
	password: {
		type: String,
		min: 3,
		max: 10,
		required: true,
	},
	// strict: true,
});

// Export model
// Compile model from schema
module.exports = mongoose.model("User", userSchema);
