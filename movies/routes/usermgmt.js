var express = require("express");
var router = express.Router();
var credentials = require("../DALs/getJsonData");
const session = require("../BLs/sessionMgmt");

router.get("/", async (req, res, next) => {
  let status = await session.checkStatus(req.session);
  if(req.session.admin != true){
    res.send("Unauthorized "+"<a href='/home'>Home</a>")
  }
  if (status) {
    let creds = await credentials.getJsonData();
    res.render("usermgmt", { creds, admin: req.session.admin });
  } else {
    res.redirect("/login");
  }
});

router.get("/add", async (req, res, next) => {
  let status = await session.checkStatus(req.session);
  if (status) {
    let creds = await credentials.getJsonData();
    res.render("newUser", { creds, admin: false });
  } else {
    res.redirect("/login");
  }
});

router.get("/:user", async (req, res, next) => {
  let status = await session.checkStatus(req.session);
  if (status) {
    let allUsers = await credentials.getJsonData();
    let user = allUsers.find((x) => x.username === req.params.user);
    let admin;
    user.admin == true ? (admin = "checked") : (admin = "off");
    res.render("updateUser", { user, admin, allow: false });
  } else {
    res.redirect("/login");
  }
});

router.get("/:user/delete", async (req, res, next) => {
  let status = await session.checkStatus(req.session);
  if (status) {
    let allUsers = await credentials.getJsonData();
    let index = allUsers.findIndex((x) => x.username === req.params.user);
    if (index != -1) {
      let creds = [...allUsers];
      creds.splice(index, 1);
      credentials.editJsonData(creds);
      res.redirect("/usermgmt");
    } else {
      res.render("error", { message: "Not Found", error: "User Not Found" });
    }
  } else {
    res.redirect("/login");
  }
});

router.post("/:user/update", async (req, res, next) => {
  let status = await session.checkStatus(req.session);
  if (status) {
    let allUsers = await credentials.getJsonData();
    let index = allUsers.findIndex((x) => x.username === req.params.user);
    let creds = [...allUsers];
    let admin;
    req.body.admin == "on" ? (admin = true) : (admin = false);
    creds[index].password = req.body.password;
    creds[index].admin = admin;
    creds[index].credits = req.body.credits;
    req.session.credits = req.session.credits - 1;
    await credentials.editJsonData(creds);
    res.redirect("/usermgmt");
  } else {
    res.redirect("/login");
  }
});

router.post("/add", async (req, res, next) => {
  let status = await session.checkStatus(req.session);
  if (status) {
    let allUsers = await credentials.getJsonData();
    let admin;
    req.body.admin == "on" ? (admin = true) : (admin = false);
    let newUser = { username: req.body.username, password: req.body.pwd, authenticated: false, admin: admin, credits: req.body.credits };
    let findDups = allUsers.find((x) => x.username === req.body.username);
    if (findDups) {
      res.send("username already exists!");
    } else {
      let creds = [...allUsers, newUser];
      await credentials.editJsonData(creds);
      res.redirect("usermgmt");
      // , { creds, allow: false }
    }
  } else {
    res.redirect("/login");
  }
});

module.exports = router;
