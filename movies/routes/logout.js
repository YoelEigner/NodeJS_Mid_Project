var express = require("express");
var router = express.Router();
var credentials = require("../DALs/getJsonData");

router.get("/", async (req, res, next) =>{
  console.log("temp")
  let creds = await credentials.getJsonData();
  let temp = [...creds];
  temp.forEach(user => {
    // console.log(user)
    user.authenticated = false
  });
  // let temp = creds;
  // temp.authenticated = false;
  credentials.editJsonData(temp);

  res.redirect("/login")
})

module.exports = router;
