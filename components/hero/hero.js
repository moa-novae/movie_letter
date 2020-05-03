import hero from "./style.scss";
export default function Hero({ randomPosterUrl }) {
  return (
    <header className={hero.header}>
      <span>
        Movie <br />
        Newsletter
      </span>
      <img src={randomPosterUrl} />
    </header>
  );
}
