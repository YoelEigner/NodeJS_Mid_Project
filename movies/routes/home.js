var express = require("express");
var router = express.Router();
var allowed = require("../BLs/authentication");

/* GET users listing. */
router.get("/", async function (req, res, next) {
  let allow = await allowed.authnticated("Yoel");
  if (allow) {
    res.render("home", { allow });
  } else {
    res.render("denied");
  }
});

module.exports = router;
