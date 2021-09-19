const jFile = require("jsonfile");

const getJsonData = () => {
  return new Promise((resolve, reject) => {
    jFile.readFile(__dirname + "/../json/creds.json", (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

const getMovieData = () => {
  return new Promise((resolve, reject) => {
    jFile.readFile(__dirname + "/../json/newMovies.json", (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

const editJsonData = (data) => {
  return new Promise((resolve, reject) => {
    jFile.writeFile(__dirname + "/../json/creds.json", data, function (err) {
      if (err) {
        reject(err);
      } else {
        resolve("Success!");
      }
    });
  });
};

const saveJsonData = (obj) => {
  return new Promise((resolve, reject) => {
    jFile.writeFile(__dirname + "/../json/newMovies.json", obj, (err) => {
      if (err) {
        reject(err)
      } else {
        resolve("Success!")
      }
    });
  });
};

module.exports = { getJsonData, editJsonData, saveJsonData, getMovieData };
