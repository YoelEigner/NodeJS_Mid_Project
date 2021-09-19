var express = require("express");
var router = express.Router();
var allowed = require("../BLs/authentication");
const { getMovieData, saveJsonData } = require("../DALs/getJsonData");

/* GET users listing. */
router.get("/", async function (req, res, next) {
  let allow = await allowed.authnticated("Yoel");
  if (allow) {
    res.render("newMovie", {});
  } else {
    res.render("denied");
  }
});

router.post("/save", async (req, res, next) => {
  let movies = await getMovieData();
  let Id = movies[movies.length - 1].id;
  let newId = parseInt(Id) + 1;
  var arr = req.body.genre.split(",");
  let newMovie = { id: newId, name: req.body.name, language: req.body.language, genres: arr };
  let temp = movies;
  temp = [...temp, newMovie];
  await saveJsonData(temp);
  res.redirect("/home");
});

module.exports = router;
