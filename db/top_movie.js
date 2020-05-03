const db = require("../db/initialize").instance;

function queryTopMovie() {
  return db.any(`SELECT * FROM top_movie`);
}

module.exports = queryTopMovie;
