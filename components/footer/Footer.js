import "./style.scss";
import Link from "next/link";
export default function () {
  return (
    <footer className="footer-container">
      <Link href="/">
        <a className="footer-link">Home</a>
      </Link>
      <Link href="/about">
        <a className="footer-link"> About</a>
      </Link>
      <a href="https://www.themoviedb.org/">
        <img
          className="tmdb-logo"
          src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_1-5bdc75aaebeb75dc7ae79426ddd9be3b2be1e342510f8202baf6bffa71d7f5c4.svg"
        />
      </a>
    </footer>
  );
}
