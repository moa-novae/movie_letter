const db = require("./initialize").instance;

function queryTopMovie() {
  return db.any(`SELECT * FROM genre`);
}

module.exports = queryTopMovie;
