// importing express framework
const express = require("express");
// initializ express
const app = express();
// setting the port
const port = 8000;

// using the get method
// LOGIC for the Get Request
// here we are trying to get the data
app.get("/", (req, res) => {
  res.send("Creating My First Node JS API");
});

// Start the app
// listening to the port
app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
