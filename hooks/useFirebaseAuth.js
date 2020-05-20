import { useState } from "react";
import * as firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import { initializeNewUser } from "../db/initializeFirestore";
export default function () {
  if (!firebase.apps.length) {
    firebase.initializeApp(process.env.firebaseConfig);
  }

  const [user, setUser] = useState();
  (function authStatus() {
    firebase.auth().onAuthStateChanged(function (firebaseUser) {
      if (firebaseUser) {
        setUser(firebaseUser);
        // console.log("user: ", firebaseUser);
      } else {
        // console.log("Not signed in ");
        setUser(null);
      }
    });
  })();
  async function registerEmail(email, password) {
    const cred = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password);

    console.log("uid", cred.user.uid);
    initializeNewUser(cred.user.uid);
  }
  function loginEmail(email, password) {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  }
  function logout() {
    return firebase.auth().signOut();
  }
  return { registerEmail, loginEmail, logout, user };
}
