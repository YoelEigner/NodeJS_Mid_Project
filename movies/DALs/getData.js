const axios = require("axios");

const getMovieData = () => {
  return axios.get("https://api.tvmaze.com/shows");
};

module.exports = { getMovieData };
