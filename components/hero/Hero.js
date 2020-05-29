import style from "./style.module.scss";
export default function Hero({ randomPosterUrl }) {
  //this allows us to access poster of different sizes
  //since the randomPosterUrl passed down is an url that points to a full sized img
  //randomPosterUrl = "https://image.tmdb.org/t/p/original/eMAHXzZXoNzximFSYm2hn0LiPB0.jpg"
  //const posterSubString = "eMAHXzZXoNzximFSYm2hn0LiPB0.jpg"
  const posterSubString = randomPosterUrl.substring(
    randomPosterUrl.lastIndexOf("/") + 1
  );
  const w780Poster = "https://image.tmdb.org/t/p/w780/" + posterSubString;
  const w1280Poster = "https://image.tmdb.org/t/p/w780/" + posterSubString;
  return (
    <header className={style.header}>
      <span>
        Movie <br />
        Newsletter
      </span>
      <img src={w780Poster} />
    </header>
  );
}
