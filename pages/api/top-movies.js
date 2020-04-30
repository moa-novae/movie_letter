import queryTopMovies from "../../db/top_movie";

export default async (req, res) => {
  res.statusCode = 200;
  try {
    const topMovies = await queryTopMovies();
    res.json(topMovies);
  } catch {
    res.statusCode = 500;
  }
};
