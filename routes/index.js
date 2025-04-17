const express = require('express');
const router = express.Router();
const passport = require('passport');
const localStrategy = require("passport-local")

const userModel = require("../model/user.model")
const postModel = require("../model/post.model");
const upload = require("../config/multer");

passport.use(new localStrategy(userModel.authenticate()))


router.get('/', async function (req, res) {
  res.render('index', { title: 'Express' });
});

router.get('/feed', isLoggedIn, async function (req, res) {
  res.render('feed');
});

router.post('/upload', upload.single("file"), async function (req, res) {
  if (!req.file) {
    return res.status(400).send("no files ware uploaded!")
  }
  const user = await userModel.findOne({ username: req.session.passport.user })
  const post = await postModel.create({
    image: req.file.filename,
    imageText: req.body.imageText,
    user: user._id
  })
  user.posts.push(post._id)
  await user.save()
  res.send("Done")
});

router.get('/profile', isLoggedIn, async function (req, res) {
  const user = await userModel.findOne({ username: req.session.passport.user }).populate("posts")
  res.render("profile", { user });
});

router.get('/login', function (req, res) {
  res.render("login", { error: req.flash("error") })
});

router.get('/register', function (req, res) {
  res.render("register")
});

router.post('/login',
  passport.authenticate("local",
    { successRedirect: "/profile", failureRedirect: "/login", failureFlash: true }
  ),
  function (req, res) {
  });

router.post('/register', async function (req, res) {
  const { fullname, username, email, password } = req.body;
  const userData = new userModel({ fullname, username, email });

  userModel.register(userData, password)
    .then(function () {
      passport.authenticate("local")(req, res, function () {
        res.redirect("/profile");
      });
    })
    .catch(function (err) {
      console.log(err);
      res.redirect("/");
    });
});


router.get('/logout', function (req, res) {
  req.logout(function (err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect("/login")
};

module.exports = router;
