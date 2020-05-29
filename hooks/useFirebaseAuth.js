import { useState } from "react";
import * as firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import { initializeNewUser } from "../db/initializeFirestore";
export default function () {
  if (!firebase.apps.length) {
    const firebaseConfig = {
      apiKey: process.env.NEXT_PUBLIC_apiKey,
      authDomain: process.env.NEXT_PUBLIC_authDomain,
      databaseURL: process.env.NEXT_PUBLIC_databaseURL,
      projectId: process.env.NEXT_PUBLIC_projectId,
      storageBucket: process.env.NEXT_PUBLIC_storageBucket,
      messagingSenderId: process.env.NEXT_PUBLIC_messagingSenderId,
      appId: process.env.NEXT_PUBLIC_appId,
    };
    firebase.initializeApp(firebaseConfig);
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
    initializeNewUser(cred.user.uid, cred.user.email);
  }
  function loginEmail(email, password) {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  }
  function logout() {
    return firebase.auth().signOut();
  }
  return { registerEmail, loginEmail, logout, user };
}
