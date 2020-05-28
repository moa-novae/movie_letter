import "./style.scss";
import AuthModal from "../authModal/AuthModal";
import { EuiFlexGroup, EuiFlexItem, EuiButton } from "@elastic/eui";
import LoggedInBtns from "../loggedInBtns/LoggedInBtns";
import useFirebaseAuth from "../../hooks/useFirebaseAuth";

import Link from "next/link";
export default function () {
  const { registerEmail, loginEmail, logout, user } = useFirebaseAuth();
  return (
    <div className="container">
      <article className="about">
        <p className="overview">
          Get email notification for upcoming movies that you might like!
        </p>
        <img src="/mail.svg" className="email" alt="Image of email on phone" />
        <p className="filter-method">
          Filter upcoming movies by directors, genres, actors, ratings, or
          writers!
        </p>
        <img src="/search.svg" className="filter" alt="Image of a search bar" />
      </article>
      <div className="btn-container">
        {user ? (
          <LoggedInBtns logout={logout} />
        ) : (
          <>
            <AuthModal loginEmail={loginEmail} />
            <div className="btn-spacer"></div>
            <AuthModal register registerEmail={registerEmail} />
          </>
        )}
      </div>
    </div>
  );
}
