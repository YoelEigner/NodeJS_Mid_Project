var express = require("express");
var router = express.Router();
const { getMovieData, saveJsonData } = require("../DALs/getJsonData");
const session = require("../BLs/sessionMgmt");

/* GET users listing. */
router.get("/", async function (req, res, next) {
  let status = await session.checkStatus(req.session);
  if(status){
    res.render("newMovie", {});  }
  else{
    res.redirect('/login')
  }
});

router.post("/save", async (req, res, next) => {
  let status = await session.checkStatus(req.session);
  if(status){
    let movies = await getMovieData();
    let Id = movies[movies.length - 1].id;
    let newId = parseInt(Id) + 1;
    var arr = req.body.genre.split(",");
    let newMovie = { id: newId, name: req.body.name, language: req.body.language, genres: arr };
    let temp = movies;
    temp = [...temp, newMovie];
    await saveJsonData(temp);
    req.session.credits = req.session.credits - 1;

    res.redirect("/home");  }
  else{
    res.redirect('/login')
  }


});

module.exports = router;
