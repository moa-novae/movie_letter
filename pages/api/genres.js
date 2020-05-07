import queryGenres from "../../db/genres";

export async function getGenres() {
  const data = await queryGenres();
  return data
}

export default async (req, res) => {
  const data = await getGenres();
  res.send(data);
};
