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

// Using jwt `require()  (importing jwt)
const jwt = require("jsonwebtoken");

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

// (Middleware) function to authenticate token
function authenticateToken(req, res, next) {
  console.log(req.headers);
  const authHeaderToken = req.headers["authorization"];
  // if there is no token
  if (!authHeaderToken) return res.sendStatus(401);
  // if there is token then  verify
  jwt.verify(authHeaderToken, "asdl4u47jj4dj", (err, user) => {
    // token is not vaild
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

// using the get method
// LOGIC for the Get Request
// here we are trying to get the data
app.get("/", (req, res) => {
  res.send("Creating My First Node JS API");
});

// using the get method
// LOGIC for the Get Request
// Middleware
app.get("/wishlist", authenticateToken, (req, res) => {
  console.log("Am Authenticated ", req.user);
  res.send({
    items: ["The Avengers", "Tenet", "Queens Gambit"],
  });
});

app.post("/register", (req, res) => {
  const newUser = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });

  // Save Model to Database
  // save user data to dataBase
  newUser.save((err, user) => {
    //if user already exist(already been register)
    if (err) {
      console.log(err);
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

app.post("/login", (req, res) => {
  // JavaScript object containing the parse JSON
  // console.log(req.body);

  const password = req.body.password;
  const email = req.body.email;

  User.findOne({ email: email, password: password }, (err, user) => {
    // console.log(user);

    const token = genereateAccessToken(user);
    console.log("the web token for this user  is : ", token);
    if (user) {
      res.send({
        status: "Valid",
        token: token, // return token back to the fronEnd
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

// function Generating a Token
function genereateAccessToken(user) {
  const payload = {
    id: user.id,
    name: user.name,
  };
  // expires after  2 days (172800 seconds)
  return jwt.sign(payload, "asdl4u47jj4dj", { expiresIn: "172800s" });
}
