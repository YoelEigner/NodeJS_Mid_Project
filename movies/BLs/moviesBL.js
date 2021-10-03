var getMovies = require("../DALs/getData");
const { getMovieData } = require("../DALs/getJsonData");

const movies = async () => {
  moviesArr = [];
  let allMovies = await getMovies.getMovieData();
  let mv = allMovies.data;
  let jsonMovies = await getMovieData();
  mv.map((x) => {
    moviesArr.push(x);
  });
  jsonMovies.map((x) => {
    moviesArr.push(x);
  });
  return moviesArr;
};
module.exports = { movies };
