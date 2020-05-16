import "./style.scss";
import Link from "next/link";
export default function () {
  return (
    <div className='container'>
      <article className='about'>
        <p className='overview'>
          Get email notification for upcoming movies that you might like!
        </p>
        <img
          src="/mail.png"
          className='email'
          alt="Image of email on phone"
        />
        <p className="filter-method">
          Filter upcoming movies by directors, genres, actors, ratings, or
          writers!
        </p>
        <img
          src="/search.png"
          className='filter'
          alt="Image of a search bar"
        />
      </article>
      <div className="btn-container">
        <Link href="/signup">
          <a className="signin-btn">Sign in</a>
        </Link>
        <Link href="/signup">
          <a className="register-btn">Register</a>
        </Link>
      </div>
    </div>
  );
}
