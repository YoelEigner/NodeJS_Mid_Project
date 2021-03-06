var express = require("express");
var router = express.Router();
var movieSearch = require("../BLs/search");
var credentials = require("../DALs/getJsonData");
const session = require("../BLs/sessionMgmt");

/* GET users listing. */
router.get("/", async function (req, res, next) {
  let status = await session.checkStatus(req.session);
  if (status) {
    let langs = await movieSearch.getLangs();
    let geners = await movieSearch.getGeners();
    res.render("searchMovie", { langs, geners });
  } else {
    res.redirect("/login");
  }
});

router.post("/logout", async (req, res, next) => {
  let creds = await credentials.getJsonData();
  let temp = creds;
  temp.authenticated = false;
  credentials.editJsonData(temp);
  res.redirect("/login");
});

router.post("/moviefilter", async function (req, res, next) {
  let status = await session.checkStatus(req.session);
  if (status) {
    //search by name
    let name = await movieSearch.movie(req.body.movieName);
    //search filtered by genre
    let genres = await movieSearch.movieByGenres(req.body.genres, name);
    //search filtered by language
    let language = await movieSearch.movieByLanguage(req.body.language, genres);
    //get uniq random genre from search results
    let genersarr = [];
    let genre = language.map((x) => genersarr.push(...x.genres));
    uniq = [...new Set(genersarr)];
    randomGenre = movieSearch.getRandomItems(uniq, 1);

    if (req.body.genres == "Select a genre") {
      //get similar items
      let like = await movieSearch.similar(randomGenre[0], genre);
      results = movieSearch.getRandomItems(like, 5);
      //remove similar items from results
      // results.forEach(mv => {
      //   let index = language.findIndex(x => x.name == mv.name)
      // language.splice(index)
      //   console.log(index, 1)

      // });
    } else {
      //get similar items
      let like = await movieSearch.similar(req.body.genres, genre);
      results = movieSearch.getRandomItems(like, 5);
    }
    req.session.credits = req.session.credits - 1;
    res.render("results", { language, results });
  } else {
    res.redirect("/login");
  }
});

router.get("/:id", async function (req, res, next) {
  let status = await session.checkStatus(req.session);
  if (status) {
    let movie = await movieSearch.movieById(req.params.id);

    res.render("movie", { movie });
  } else {
    res.redirect("/login");
  }
});

module.exports = router;
