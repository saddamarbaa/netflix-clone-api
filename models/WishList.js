/** @format */

// Import the mongoose module from node_modules
const mongoose = require("mongoose");

// Grab The Schema Object from mongoose
const { Schema } = mongoose;

// Defining a Model and Creating a Database Schema
// define wishlist a schema
const wishListSchema = new Schema({
	// user Id is reference to user ID in DB (Foreign-key mongoose)
	user: {
		type: Schema.Types.ObjectId,
		ref: "Users",
	},
	movieId: Number,
	backdrop_path: String,
	title: String,
});

// unique compound index
// the movie and the User are now unique no duplicates movie in DB
wishListSchema.index({ user: 1, movieId: 1 }, { unique: true });

// Compile model from schema
const WishList = mongoose.model("WishList", wishListSchema);

// Export model
module.exports = WishList;
