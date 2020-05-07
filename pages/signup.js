import Head from "next/head";
import Multifield from "../components/multifield/Multifield";
import { getGenres } from "./api/genres";

export default function SignUp({ genres }) {
  return (
    <>
      <Head>
        <title>Movie News Letter</title>
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css"
        />
      </Head>
      <main>
        <Multifield genres={genres} />
      </main>
    </>
  );
}

export async function getStaticProps() {
  const genres = await getGenres();
  return {
    props: { genres },
  };
}
