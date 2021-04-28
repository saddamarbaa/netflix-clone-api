/** @format */

const express = require("express");
const router = express.Router();

const WishList = require("../models/WishList");
const authenticateToken = require("../auths/auth");

// API Endpoint to add wishlist(protected route)
// Call (authenticateToken) Middleware function first
router.post("/", authenticateToken, (req, res) => {
	// Create new wishlist
	const newWishListItem = new WishList({
		user: req.user.id,
		movieId: req.body.movieId,
		backdrop_path: req.body.backdrop_path,
		title: req.body.title,
	});

	// Save the wishlist item
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
				status: "saved",
			});
		}
	});
});

// API Endpoint to get wishlist(protected route)
// Call (authenticateToken) Middleware function first
router.get("/", authenticateToken, (req, res) => {
	console.log("I am  authenticated User ", req.user);
	WishList.find({ user: req.user.id }, (err, docs) => {
		if (err) {
			res.send(400, {
				status: err,
			});
		} else {
			res.send({
				status: "good",
				results: docs, // return wishlist movies
			});
		}
	});
});

module.exports = router;
