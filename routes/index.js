const express = require('express');
const router = express.Router();
const userModel = require("../model/user.model")
const postModel = require("../model/post.model")

router.get('/', async function (req, res) {
  res.render('index', { title: 'Express' });
});


module.exports = router;
