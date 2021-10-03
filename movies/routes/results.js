var express = require("express");
var router = express.Router();
const session = require("../BLs/sessionMgmt");


router.get("/", async function (req, res, next) {
  let status = await session.checkStatus(req.session);
  if(status){
    res.render("results", {});
  }
  else{
    res.redirect('/login')
  }
});

module.exports = router;
