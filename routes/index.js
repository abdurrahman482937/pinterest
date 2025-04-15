const express = require('express');
const router = express.Router();
const userModel = require("../model/user.model")
const postModel = require("../model/post.model")

router.get('/', async function (req, res) {
  res.render('index', { title: 'Express' });
});

router.get('/createuser', async function (req, res) {
  const user = await userModel.create({
    fullname: "Abdur Rahman",
    username: "abdurrahman",
    password: "pAss@123",
    email: "abdurrahman@gmail.com ",
    dp: "",
    posts: [],
  })
  res.send(user)
});

module.exports = router;
