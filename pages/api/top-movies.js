import { fetchTopMovies } from "../../db/initializeFirestore.js";

export default async (req, res) => {
  return new Promise((resolve, reject) => {
    fetchTopMovies()
      .then((response) => {
        res.statusCode = 200;
        res.json(response);
        resolve();
      })
      .catch((error) => {
        res.json(error);
        console.log("error", error);
        res.status(405).end();
        resolve();
      });
  });
};
