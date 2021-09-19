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
    //find user index in array
    let index = users.findIndex((x) => x.username === creds.username);
    let temp = [...users];
    //set to true
    temp[index].authenticated = true;
    // update JSON
    credentials.editJsonData(temp);
    res.render("home", { user: creds.username });
  } else {
    res.render("denied");
  }
});

module.exports = router;
