import AuthModal from "../authModal/AuthModal";
import { EuiFlexGroup, EuiFlexItem, EuiButton } from "@elastic/eui";
import LoggedInBtns from "../loggedInBtns/LoggedInBtns";
import useFirebaseAuth from "../../hooks/useFirebaseAuth";
import style from "./style.module.scss";
import Link from "next/link";
export default function () {
  const { registerEmail, loginEmail, logout, user } = useFirebaseAuth();
  return (
    <div className={style["intro-container"]}>
      <article className={style.about}>
        <p className={style.overview}>
          Receive monthly email notifications for upcoming movies that you might
          like!
        </p>
        <img
          src="/mail.svg"
          className={style.email}
          alt="Image of email on phone"
        />
        <p className={style["filter-method"]}>
          Filter upcoming movies by directors, genres, actors, or production
          company
        </p>
        <img
          src="/search.svg"
          className={style.filter}
          alt="Image of a search bar"
        />
      </article>
      <div className={style["btn-container"]}>
        {user ? (
          <LoggedInBtns logout={logout} />
        ) : (
          <>
            <AuthModal loginEmail={loginEmail} />
            <div className={style["btn-spacer"]}></div>
            <AuthModal register registerEmail={registerEmail} />
          </>
        )}
      </div>
    </div>
  );
}
