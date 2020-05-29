import * as firebase from "firebase/app";
import "firebase/firestore";

(function () {
  const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_apiKey,
    authDomain: process.env.NEXT_PUBLIC_authDomain,
    databaseURL: process.env.NEXT_PUBLIC_databaseURL,
    projectId: process.env.NEXT_PUBLIC_projectId,
    storageBucket: process.env.NEXT_PUBLIC_storageBucket,
    messagingSenderId: process.env.NEXT_PUBLIC_messagingSenderId,
    appId: process.env.NEXT_PUBLIC_appId,
  };
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
})();
export const initializeNewUser = function (uid, email) {
  const db = firebase.firestore();
  console.log(db);
  return db
    .collection("users")
    .doc(uid)
    .set({ uid, filters: {}, email })
    .then(() => {
      console.log("new user created");
    })
    .catch((e) => {
      console.log("error", e);
    });
};

export const fetchAllFilters = function (uid) {
  const db = firebase.firestore();
  return db
    .collection("users")
    .doc(uid)
    .get()
    .then((doc) => {
      if (doc.exists) {
        return doc.data();
      } else {
        return null;
      }
    })
    .catch(function (error) {
      console.log("Error getting document:", error);
    });
};

export const addNewFilter = function (uid, finalFilterObj) {
  const db = firebase.firestore();
  return db.collection("users").doc(uid).set(finalFilterObj, { merge: true });
};

export const toggleFilter = function (uid, filterId, bool) {
  const db = firebase.firestore();
  const filter = { [filterId]: { enabled: bool } };
  return db
    .collection("users")
    .doc(uid)
    .set({ filters: filter }, { merge: true });
};

export const deleteFilter = function (rule) {
  const db = firebase.firestore();
  const filterRef = "filters." + rule.filterId;
  return db
    .collection("users")
    .doc(rule.uid)
    .update({
      ["filters." + rule.filterId]: firebase.firestore.FieldValue.delete(),
    });
};
