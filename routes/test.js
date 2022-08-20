var express = require("express");
var router = express.Router();

const db = require("../db/db");

/**
 * url: /test/dbconn
 * connect MySQL by Sequelize
 */
router.get("/dbconn", function (req, res, next) {
  const title = "db(sequelize) connection";
  db.sequelize
    .authenticate()
    .then((_) => {
      res.render("test", { title: title, info: "connection: OK!" });
    })
    .catch((err) => {
      res.render("test", { title: title, info: "connection error: " + err });
    });
});

/**
 * url: /test/adduser
 * insert a row of static data into Database
 */
var User = require("../model/user");
router.get("/adduser", async function (req, res, next) {
  let userAlice = await User.create({
    username: "Alice",
    password: "123456",
    gender: "1",
  });
  const title = "ORM way to insert a data.";
  let userId = userAlice.id;
  if (userId != null) {
    res.render("test", { title: title, info: "insert data: OK! id:" + userId });
  } else {
    res.render("test", { title: title, info: "insertion failed..." });
  }
});

module.exports = router;
