import "./style.scss";
export default function Hero({ randomPosterUrl }) {
  return (
    <header className='header'>
      <span>
        Movie <br />
        Newsletter
      </span>
      <img src={randomPosterUrl} />
    </header>
  );
}
