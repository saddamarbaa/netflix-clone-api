/** @format */

// Import express  from node_modules
const express = require("express");

// Grab The Router from express
const router = express.Router();

// Grab The register Object from controllers
const register = require("../controllers/register");

// API Endpoint for register
router.post("/", register);

module.exports = router;
