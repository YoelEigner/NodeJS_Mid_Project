var express = require("express");
var router = express.Router();
var session = require("../BLs/sessionMgmt");

/* GET users listing. */
router.get("/", async function (req, res, next) {
  let status = await session.checkStatus(req.session);
  if(status){
    res.render("home", { admin: req.session.admin });
  }
  else{
    res.redirect('/login')
  }
});

module.exports = router;
