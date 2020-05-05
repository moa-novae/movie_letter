import introduction from "./style.scss";
export default function () {
  return (
    <article>
      <p className={introduction.overview}>
        Get email notification for upcoming movies that you might like!
      </p>
      <img src="/mail.png" className={introduction.email} />

      <p className={introduction["filter-method"]}>
        Filter upcoming movies by directors, genres, actors, ratings, or
        writers!
      </p>
      <img src="/search.png" className={introduction.filter} />
    </article>
  );
}
