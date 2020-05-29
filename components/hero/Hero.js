import style from "./style.module.scss";
export default function Hero({ randomPosterUrl }) {
  return (
    <header className={style.header}>
      <span>
        Movie <br />
        Newsletter
      </span>
      <img src={randomPosterUrl} />
    </header>
  );
}
