// importing express framework
const express = require("express");
// initializ express
const app = express();
// setting the port
const port = 3000;

// Using Node.js `require()  (importing mongoose)
const mongoose = require("mongoose");

// Grab The Schema Object from  mongoose
const { Schema } = mongoose;

// Using cors `require()
const cors = require("cors");

require("dotenv").config();

// connect  mongoose to MongoDB.
mongoose.connect(
  `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.ffror.mongodb.net/netflix-api-db-dev?retryWrites=true&w=majority`,
  {
    useCreateIndex: true,
    useUnifiedTopology: true,
    useNewUrlParser: true,
  }
);

// define a schema
const User = mongoose.model(
  "users",
  new Schema({
    name: String,
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: { type: String, required: true },
  })
);

// determine which domain can access the website
app.use(cors());

// Parse JSON bodies for this app.
app.use(express.json());

// using the get method
// LOGIC for the Get Request
// here we are trying to get the data
app.get("/", (req, res) => {
  res.send("Creating My First Node JS API");
});

app.post("/register", (req, res) => {
  const newUser = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });

  // Save Model to Database
  newUser.save((err, user) => {
    if (err) {
      console.log(err);
      res.send(400, {
        status: err,
      });
    } else {
      console.log("all is good");
      console.log(user);
      res.send("registered");
    }
  });
});

app.post("/login", (req, res) => {
  // JavaScript object containing the parse JSON
  // console.log(req.body);

  const password = req.body.password;
  const email = req.body.email;

  User.findOne({ email: email, password: password }, (err, user) => {
    console.log(user);
    if (user) {
      res.send({
        status: "Valid",
      });
    } else {
      res.send(404, {
        status: "Not Found",
      });
    }
  });
});

// Start the app
// listening to the port
app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
