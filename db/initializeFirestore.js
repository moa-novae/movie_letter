import * as firebase from "firebase/app";
import "firebase/firestore";

(function () {
  if (!firebase.apps.length) {
    firebase.initializeApp(process.env.firebaseConfig);
  }
})();
export const initializeNewUser = function (uid) {
  const db = firebase.firestore();
  console.log(db);
  return db
    .collection("users")
    .doc(uid)
    .set({ uid: uid, filters: {} })
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
