/** @format */

// Import express  from node_modules
const express = require("express");

// Grab The Router from express
const router = express.Router();

// Create WishList model
const WishList = require("../models/WishList");

// Import Middleware function to authenticate token From different file
const authenticateToken = require("../helpers/auth");

// API Endpoint to add wishlist
// Call (authenticateToken) Middleware function first
// This is now a protected route
router.post("/", authenticateToken, (req, res) => {
	// create new wishlist
	const newWishListItem = new WishList({
		user: req.user.id,
		movieId: req.body.movieId,
		backdrop_path: req.body.backdrop_path,
		title: req.body.title,
	});

	// save the wishlist item
	newWishListItem.save((err, WishList) => {
		//if user already exist(already been register)
		if (err) {
			console.log("unable to save to database");
			res.status(400).send({
				status: err,
			});
		} else {
			console.log("wishlistItem been saved to database");
			res.status(200).send({
				wishlistItem: WishList, // return the WishList
				status: "WishList is been saved",
			});
		}
	});
});

// API Endpoint to get wishlist(Return All the wishlists movie)
// Call (authenticateToken) Middleware function first
// This is now a protected route
router.get("/", authenticateToken, (req, res) => {
	console.log("I am  authenticated User ", req.user);
	// find all the wishlist base on user
	WishList.find({ user: req.user.id }, (err, docs) => {
		if (err) {
			res.send(400, {
				status: err,
			});
		} else {
			res.send({
				status: "good",
				results: docs, // return wishlists movies
			});
		}
	});
});

module.exports = router;
