var express = require("express");
var signService = require("../service/signService");

var router = express.Router();

router.get("/signup", function (req, res, next) {
  res.render("sign/signup", { title: "Sign Up" });
});

router.get("/signup/isUsernameExists", async (req, res) => {
  let username = req.query.username;
  signService.findByUsername(username).then((userList) => {
    if (userList.length > 0) {
      res.send("exists");
    } else {
      res.send("OK");
    }
  });
});

router.post("/signup", (req, res) => {
  let nickname = req.body.nickname;
  if (nickname == "") {
    nickname = signService.generateRandomStr(12);
  }
  let user = {
    username: req.body.username,
    nickname: nickname,
    email: req.body.email,
    password: req.body.password,
    phone: req.body.phone,
  };
  signService.signup(user);
  res.render("index", { title: "signup test done." });
});

router.get("/signin", (req, res) => {
  res.render("sign/signin", { title: "sign in" });
});

router.post("/signin", (req, res) => {
  let signinFields = {
    username: req.body.username,
    password: req.body.password,
  };
  let isSigninSuccess = signService.signin(
    signinFields.username,
    signinFields.password
  );
  if (isSigninSuccess) {
    res.render("album", { title: "album" });
  }
});

module.exports = router;
