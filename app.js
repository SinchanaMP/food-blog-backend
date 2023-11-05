const express = require("express");
const app = express();

const mongoose = require("mongoose");
const cors = require("cors"); //cors origin resource sharing

const PORT = 4000;

//user model
const User = require("./users");
const Food = require("./food");

//middlewareno
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));

// const dbURL='mongodb://localhost:27017/FoodBlog
// URL=mongodb://127.0.01:27017

const dbURL = "mongodb://0.0.0.0:27017";

mongoose
  .connect(dbURL, {})
  .then(() => {
    console.log("Connected to database");
  })
  .catch((err) => console.log("err", err));

//login
app.post("/signin", (req, res) => {
  User.findOne({ email: req.body.email }).then((doc) => {
    if (doc) {
      if (doc.password === req.body.password) {
        res.send({ message: "Login Succesfull", status: 200 });
      } else {
        res.send({ message: "User not found" });
      }
    }
  });
});

//signup
app.post("/signup", (req, res) => {
  User.findOne({ email: req.body.email }).then((doc) => {
    if (doc) {
      res.send({ message: "user already registered" });
    } else {
      let data = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      });
      data
        .save()
        .then(() => {
          res.send({ message: "user registration successful" });
        })
        .catch((err) => {
          res.send({ message: "user registration failed" });
        });
    }
  });
});

//add food
app.post("/addfood", (req, res) => {
  const data = new Food({
    title: req.body.title,
    author: req.body.author,
    imageURL: req.body.imageURL,
  });
  data
    .save()
    .then(() => {
      res.send({ message: "food added successfully" });
    })
    .catch((err) => {
      res.send({ message: "error while adding food" });
    });
});

//fetch all data
app.get("/food", async (req, res) => {
  try {
    const data = await Food.find();
    res.json(data);
  } catch (error) {
    console.log(error);
  }
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

//home food add food

//title author image
