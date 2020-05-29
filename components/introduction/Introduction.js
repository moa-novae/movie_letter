import "./style.scss";
import AuthModal from "../authModal/AuthModal";
import { EuiFlexGroup, EuiFlexItem, EuiButton } from "@elastic/eui";
import LoggedInBtns from "../loggedInBtns/LoggedInBtns";
import useFirebaseAuth from "../../hooks/useFirebaseAuth";

import Link from "next/link";
export default function () {
  const { registerEmail, loginEmail, logout, user } = useFirebaseAuth();
  return (
    <div className="intro-container">
      <article className="about">
        <p className="overview">
          Receive monthly email notifications for upcoming movies that you might
          like!
        </p>
        <img src="/mail.svg" className="email" alt="Image of email on phone" />
        <p className="filter-method">
          Filter upcoming movies by directors, genres, actors, or production
          company
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
