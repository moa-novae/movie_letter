import introduction from "./style.scss";
import Link from "next/link";
export default function () {
  return (
    <div className={introduction.container}>
      <article>
        <p className={introduction.overview}>
          Get email notification for upcoming movies that you might like!
        </p>
        <img src="/mail.png" className={introduction.email} alt="Image of email on phone" />

        <p className={introduction["filter-method"]}>
          Filter upcoming movies by directors, genres, actors, ratings, or
          writers!
        </p>
        <img src="/search.png" className={introduction.filter} alt="Image of a search bar" />
      </article>
      <Link href="/signup">
        <a className={introduction["signup-btn"]}>Subscribe</a>
      </Link>
    </div>
  );
}
