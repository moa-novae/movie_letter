import * as firebase from "firebase/app";
import "firebase/auth";
import Head from "next/head";
import Hero from "../components/hero/Hero";
import Introduction from "../components/introduction/Introduction";
import Footer from "../components/footer/Footer";
import { fetchTopMovies } from "../db/initializeFirestore";

export default function Home({ randomPosterUrl }) {
  return (
    <>
      <Head>
        <title>Movie News Letter</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="index-landing">
        <Hero randomPosterUrl={randomPosterUrl} />
        <Introduction />
      </main>
      <Footer />
    </>
  );
}

export async function getServerSideProps() {
  const res = await fetchTopMovies();
  function selectRandomFromArray(arr) {
    const randomIndex = Math.floor(Math.random() * arr.length);
    return arr[randomIndex];
  }
  //res.data has many posters of one movie
  const randomPosterUrl =
    selectRandomFromArray(res) ||
    "https://image.tmdb.org/t/p/original/eMAHXzZXoNzximFSYm2hn0LiPB0.jpg";

  return {
    props: { randomPosterUrl },
  };
}
