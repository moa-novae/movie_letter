import Head from "next/head";
import axios from "axios";

export default function Home({ randomPosterUrl }) {
  return (
    <>
      <Head>
        <title>Movie News Letter</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <img src={randomPosterUrl} />{" "}
      </main>
    </>
  );
}

export async function getServerSideProps() {
  const res = await axios.get(`http://localhost:3000/api/top-movies`);
  function selectRandomFromArray(arr) {
    const randomIndex = Math.floor(Math.random() * arr.length);
    return arr[randomIndex];
  }
  const randomTopMovie = selectRandomFromArray(res.data);
  const randomPosterUrl = selectRandomFromArray(randomTopMovie.image_path);
  return {
    props: { randomPosterUrl },
  };
}
