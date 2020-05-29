import Hero from "../components/hero/Hero";
import axios from "axios";
import Footer from "../components/footer/Footer";

export default function ({ randomPosterUrl }) {
  return (
    <div className="about-landing">
      <main>
        <Hero randomPosterUrl={randomPosterUrl} />
        <div className="about-container">
          <p className="about-paragraph">I made this for fun!</p>
          <p className="about-paragraph">
            <span>
              There are still a lot of features I would like to implement. If
              there is something bugging you, let me know on
            </span>
            <a href="https://github.com/moa-novae"> GitHub</a>
          </p>
          <p className="about-paragraph">
            This is made possible by the TMDB API
          </p>
          <a href="https://www.themoviedb.org/?language=en-US">
            <img
              className="tmdb-logo-about"
              src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_1-5bdc75aaebeb75dc7ae79426ddd9be3b2be1e342510f8202baf6bffa71d7f5c4.svg"
            />
          </a>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export async function getServerSideProps() {
  // const res = await axios.get(`http://localhost:3000/api/top-movies`);
  // function selectRandomFromArray(arr) {
  //   const randomIndex = Math.floor(Math.random() * arr.length);
  //   return arr[randomIndex];
  // }
  // //res.data has many movies
  // const randomTopMovie = selectRandomFromArray(res.data);
  //a movie has many posters
  const randomPosterUrl =
    // selectRandomFromArray(randomTopMovie.image_path) ||
    "https://image.tmdb.org/t/p/original/eMAHXzZXoNzximFSYm2hn0LiPB0.jpg";

  return {
    props: { randomPosterUrl },
  };
}
