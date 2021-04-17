/** @format */

// Import express  from node_modules
const express = require("express");

// Grab The Router from express
const router = express.Router();

// Import jwt from node_modules (Using jwt)
const jwt = require("jsonwebtoken");

// Create WishList model
const WishList = require("../models/WishList");

// function for Generating Token
const generateAccessToken = (user) => {
	const payload = {
		id: user.id,
		name: user.name,
	};
	// expires after 2 days (172800 seconds)
	// "asdl4u47jj4dj" is the Secret Key
	return jwt.sign(payload, "asdl4u47jj4dj", { expiresIn: "7200s" });
};

// Middleware function to authenticate token
const authenticateToken = (req, res, next) => {
	// console.log("req.headers is ", req.headers);
	// get jwt Token from the request header
	const authHeaderToken = req.headers["authorization"];

	// if there is no token
	// HTTP Status 401 mean Unauthorized
	if (!authHeaderToken) {
		return res.status(401).send({
			status: "Unauthorized",
		});
	}

	// if there is token then verify
	jwt.verify(authHeaderToken, "asdl4u47jj4dj", (err, user) => {
		// token is not valid (token is expired)
		// HTTP Status 403 mean Forbidden
		if (err) {
			return res.status(403).send({
				status: "Maybe is token is expired(Forbidden)",
			});
		}

		// console.log("The Authorized User is ", user);
		req.user = user;
		next();
	});
};

// API Endpoint add wishlist
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
				status: "saved",
			});
		}
	});
});

// API Endpoint get wishlist
// Middleware
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
