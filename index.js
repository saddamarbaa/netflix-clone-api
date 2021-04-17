/** @format */

// Import express framework from node_modules
const express = require("express");

// Initialize express
const app = express();

// Import jwt from node_modules (Using jwt)
const jwt = require("jsonwebtoken");

// Require dotenv(to manage secrets and configs)
// Using dotenv package to create environment variables
const dotenv = require("dotenv");
dotenv.config();

// Create User model just by requiring the User
const User = require("./models/User");

// Create WishList model
const WishList = require("./models/WishList");

// Import mongoose from node_modules
const mongoose = require("mongoose");

// Access Environment variables
const MONGO_USER = process.env.MONGO_USER;
const MONGO_PASSWORD = process.env.MONGO_PASSWORD;
const MONGO_DB_NAME = process.env.MONGO_DB_NAME;
const PORT = process.env.PORT || 5000;

// Connect mongoose to MongoDB.
mongoose
	.connect(
		`mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@cluster0.ffror.mongodb.net/${MONGO_DB_NAME}?retryWrites=true&w=majority`,
		{
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useFindAndModify: false,
			useCreateIndex: true,
		},
	)
	.then(() =>
		console.log("MongoDB database connection established successfully ..."),
	)
	.catch((error) => console.log("MongoDB connection error:", error));

// Get the default connection
const db = mongoose.connection;

// Bind connection to error event (to get notification of connection errors)
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// Import cors from node_modules (Using cors)
const cors = require("cors");

// Determine which domain can access the website
app.use(cors());

// Prses incoming requests with JSON payloads
app.use(express.json());

// Import Home page routes
const homePage = require("./routes/homePage");

// Import register routes
const register = require("./routes/register");

// Import login routes
const login = require("./routes/Login");

// Import wishlist routes
const wishlist = require("./routes/wishlist");

//  Now we can use all the Routes
// (/) is the base URL for Home page Routes
app.use("/", homePage);

// (/register) is the base URL for register Routes
app.use("/register", register);

// (/login) is the base URL for login Routes
app.use("/login", login);

// (/wishlist) is the base URL for wishlist Routes
app.use("/wishlist", wishlist);

// Server setup
// Tell our app to listen on the given port
app.listen(PORT, () => {
	console.log(`Example app listening at http://localhost: ${PORT}`);
});
