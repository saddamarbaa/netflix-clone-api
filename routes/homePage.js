/** @format */

// Import express  from node_modules
const express = require("express");

// Grab The Router from express
const router = express.Router();

// Grab The  getHomePage Object from controllers
const getHomePage = require("../controllers/homePage");

// Home page API Endpoint (define the home page route)
router.get("/", getHomePage);

module.exports = router;
