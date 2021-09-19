const allMvs = require("./moviesBL");

let test = 0 
const movie = async (text) => {
  let allMovies = await allMvs.movies();
  let movie = allMovies.filter((x) => x.name.includes(text));
  return movie;
};
const movieById = async (id) => {
  let allMovies = await allMvs.movies();
  let movie = allMovies.find((x) => x.id == id);
  return movie;
};
const movieByGenres = async (genre, movieArr) => {
  if (genre == "Select a genre") {
    return movieArr;
  } else {
    let movie = movieArr.filter((x) => x.genres.includes(genre));
    return movie;
  }
};

const similar = async (genre) => {
  let allMovies = await allMvs.movies();
  let movies = allMovies.filter((x) => x.genres.includes(genre));
  return movies;
};

const movieByLanguage = async (language, movieArr) => {
  if (language == "Select a language") {
    return movieArr;
  } else {
    let movie = movieArr.filter((x) => x.language == language);
    return movie;
  }
};

const getGeners = async () => {
  let genersarr = [];
  let allMovies = await allMvs.movies();

  allMovies.map((x) => genersarr.push(...x.genres));
  uniq = [...new Set(genersarr)];
  return uniq;
};
const getLangs = async () => {
  let genersarr = [];
  let allMovies = await allMvs.movies();
  let movies = allMovies;
  let lang = movies.forEach((x) => {
    genersarr.push(x.language);
  });

  uniq = [...new Set(genersarr)];
  return uniq;
};

const getRandomItems = (array, numOfItems) => {
  return array.slice(0, numOfItems).map(() => {
    return array.splice(Math.floor(Math.random() * array.length), 1)[0];
  }, array.slice());
};

module.exports = { movie, getGeners, getLangs, movieById, movieByLanguage, movieByGenres, similar, getRandomItems };
