const db = require("../db/initialize").instance;

export default async () => {
  const output = await db.any(`SELECT * FROM top_movie`);
  return output;
};
