export default async (req, res) => {
  if (req.method === "POST") {
    console.log(req.body);
    res.status(200);
    res.send("hello");
  } else {
    res.status(405).end();
  }
};
