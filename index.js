// import express framework from node_modules
const express = require("express");

// initializ express
const app = express();

// setting the port
const port = 3000;

// import cors from node_modules (Using cors)
const cors = require("cors");

// import jwt from node_modules (Using jwt)
const jwt = require("jsonwebtoken");

// require dotenv(to manage secrets and configs)
// Using dotenv package to create environment variables
require("dotenv").config();

// determine which domain can access the website
app.use(cors());

// Parse JSON bodies for this app.
app.use(express.json());

// import mongoose from node_modules
const mongoose = require("mongoose");

// Grab The Schema Object from mongoose
const { Schema } = mongoose;

// connect mongoose to MongoDB.
mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.ffror.mongodb.net/netflix-api-db-dev?retryWrites=true&w=majority`,
    {
      useCreateIndex: true,
      useUnifiedTopology: true,
      useNewUrlParser: true,
    }
  )
  .then(() => console.log("conneted to DB ..."))
  .catch((error) => console.log(error));

// define user a schema

const User = mongoose.model(
  "Users",
  new Schema({
    name: String,
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  })
);

// define Wishlist a schema

const WishListSchema = new Schema({
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
WishListSchema.index({ user: 1, movieId: 1 }, { unique: true });

const WishList = mongoose.model("WishList", WishListSchema);

/**
 * function for Generating Token
 */

const genereateAccessToken = (user) => {
  const payload = {
    id: user.id,
    name: user.name,
  };
  // expires after 2 days (172800 seconds)
  //  "asdl4u47jj4dj" is the Secret Key
  return jwt.sign(payload, "asdl4u47jj4dj", { expiresIn: "7200s" });
};

/**
 *  Middleware function to authenticate token
 */

const authenticateToken = (req, res, next) => {
  // console.log("req.headers is ", req.headers);
  // get jwt Token from the request header
  const authHeaderToken = req.headers["authorization"];

  // if there is no token
  // HTTP Status 401 mean Unauthorized
  if (!authHeaderToken) return res.sendStatus(401);

  // if there is token then verify
  jwt.verify(authHeaderToken, "asdl4u47jj4dj", (err, user) => {
    // token is not vaild (token is expired)
    // HTTP Status 401 mean Forbidden
    if (err) return res.sendStatus(403);

    // console.log("The Authorized User is ", user);
    req.user = user;
    next();
  });
};

/**
 * using the get method
 * LOGIC for the Get Request
 * here we are trying to get the data
 */

app.get("/", (req, res) => {
  res.send("Creating My First Node JS API");
});

app.post("/register", (req, res) => {
  const newUser = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });

  // Save Model to Database(save user data to dataBase)
  newUser.save((err, user) => {
    if (err) {
      //if user already exist(already been register)
      res.send(400, {
        status: err,
      });
    } else {
      // console.log("all is good");
      // console.log(user);
      res.send({
        status: "registered",
      });
    }
  });
});

/**
 * find the user with the given email and password in the database
 * if user is valid(been fund in DB) Generate AccessToken to the user
 * and return the AccessToken to the frondEnd
 * but if user is not found then return  404 status: "Not Found"
 */

app.post("/login", (req, res) => {
  // JavaScript object containing the parse JSON
  // console.log(req.body);
  const password = req.body.password;
  const email = req.body.email;
  User.findOne({ email: email, password: password }, (err, user) => {
    // console.log(user);
    if (user) {
      const token = genereateAccessToken(user);
      console.log("The AccessToken is : ", token);
      res.send({
        status: "valid",
        token: token, // return token back to the fronEnd
      });
    } else {
      res.send(404, {
        status: "Not Found",
      });
    }
  });
});

app.post("/wishlist", authenticateToken, (req, res) => {
  // create new wishlist
  const newWishListItem = new WishList({
    user: req.user.id,
    movieId: req.body.movieId,
    backdrop_path: req.body.backdrop_path,
    title: req.body.title,
  });

  // save the wishlist item
  newWishListItem.save((err, wishlistItem) => {
    if (err) {
      res.send(400, {
        status: err,
      });
    } else {
      res.send({
        wishlistItem: wishlistItem, // return the wishlistItem
        status: "saved",
      });
    }
  });
});

/**
 * using the get method
 * LOGIC for the Get Request
 * Middleware
 */

app.get("/wishlist", authenticateToken, (req, res) => {
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

/**
 * start our app
 * listening to the port
 */

app.listen(process.env.PORT || port, () => {
  console.log(`Example app listening at http://localhost: ${port}`);
});
