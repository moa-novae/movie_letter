import { createContext, useState } from "react";
import * as firebase from "firebase/app";
import "firebase/auth";
import Head from "next/head";
import axios from "axios";
import Link from "next/link";

import Hero from "../components/hero/Hero";
import Introduction from "../components/introduction/Introduction";
import Footer from "../components/footer/Footer";

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
  const res = await axios.get(`http://localhost:3000/api/top-movies`);
  function selectRandomFromArray(arr) {
    const randomIndex = Math.floor(Math.random() * arr.length);
    return arr[randomIndex];
  }
  //res.data has many movies
  const randomTopMovie = selectRandomFromArray(res.data);
  //a movie has many posters
  const randomPosterUrl =
    selectRandomFromArray(randomTopMovie.image_path) ||
    "https://image.tmdb.org/t/p/original/eMAHXzZXoNzximFSYm2hn0LiPB0.jpg";

  return {
    props: { randomPosterUrl },
  };
}
