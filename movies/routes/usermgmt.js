var express = require("express");
var router = express.Router();
var credentials = require("../DALs/getJsonData");
var allowed = require("../BLs/authentication");

router.get("/", async (req, res, next) => {
  let allow = await allowed.authnticated("Yoel");
  let creds = await credentials.getJsonData();
  if (allow) {
    res.render("usermgmt", { creds, allow });
  } else {
    res.render("denied");
  }
});

router.get("/add", async (req, res, next) => {
  let creds = await credentials.getJsonData();
  res.render("newUser", { creds, allow: false });
});

router.post("/:user/update", async (res, req, next) => {
  let allUsers = await credentials.getJsonData();
  let index = allUsers.findIndex((x) => x.username === res.body.username);
  let creds = [...allUsers];
  let admin;
  res.body.admin == "on" ? (admin = true) : (admin = false);
  creds[index].password = res.body.password;
  creds[index].admin = admin;
  await credentials.editJsonData(creds);
  req.render("usermgmt", { creds, allow: false });
});

router.post("/add", async (res, req, next) => {
  let allUsers = await credentials.getJsonData();
  let admin;
  res.body.admin == "on" ? (admin = true) : (admin = false);
  let newUser = { username: res.body.username, password: res.body.pwd, authenticated: false, admin: admin };
  let findDups = allUsers.find((x) => x.username === res.body.username);
  if (findDups) {
    req.send("username already exists!");
  } else {
    let creds = [...allUsers, newUser];
    await credentials.editJsonData(creds);
    req.render("usermgmt", { creds, allow: false });
  }
});

router.get("/:user", async (res, req, next) => {
  let allUsers = await credentials.getJsonData();
  let user = allUsers.find((x) => x.username === res.params.user);
  let admin;
  user.admin == true ? (admin = "checked") : (admin = "off");
  req.render("updateUser", { user, admin, allow: false });
});

router.get("/:user/delete", async (res, req, next) => {
  let allUsers = await credentials.getJsonData();
  let index = allUsers.findIndex((x) => x.username === res.params.user);
  if (index != -1) {
    let creds = [...allUsers];
    creds.splice(index, 1);
    console.log(creds);
    credentials.editJsonData(creds);
    // window.history.pushState
    req.render("usermgmt", { creds, allow: false });
  } else {
    req.render("error", { message: "Not Found", error: "User Not Found" });
  }
});

module.exports = router;
