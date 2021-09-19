var express = require("express");
var router = express.Router();
var allowed = require("../BLs/authentication");

router.get("/", async function (req, res, next) {
  console.log("filtered")

  let allow = await allowed.authnticated('Yoel');
  if (allow) {
    res.render("results", {});
  } else {
    res.render("denied");  }
});

module.exports = router;
