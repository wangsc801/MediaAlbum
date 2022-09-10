var express = require("express");

var router = express.Router();

router.get("/", (req, res) => {
  res.render("album/index", { title: "album" });
});

module.exports = router;
