var express = require("express");
var router = express.Router();
var credentials = require("../DALs/getJsonData");

/* GET home page. */
router.get("/", async function (req, res, next) {
  res.render("login", { title: "Express" });
});

router.post("/success", async function (req, res, next) {
  //get all users
  let users = await credentials.getJsonData();
  //find current user by username
  let creds = users.find((x) => x.username === req.body.username);
  //if match

  if (creds.username === req.body.username && creds.password === req.body.pwd) {
    req.session.authenticated = true;
    req.session.admin = creds.admin;
    req.session.user = creds;
    req.session.credits = creds.credits;
    console.log(req.session.credits);
    res.redirect("/home");
  } 
  else if (Error) {
    res.send("Please try agian!" + " <a href='/login'>login</a>");
  }else {
    res.send("denied");
  }
});

module.exports = router;
