import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDBLOiWa6WjTQHODO8ey1fH6fwUd_OeajI",
  authDomain: "informateu-299a4.firebaseapp.com",
  projectId: "informateu-299a4",
  storageBucket: "informateu-299a4.appspot.com",
  messagingSenderId: "771396794946",
  appId: "1:771396794946:web:0e5ba47534505edf92cbdb",
  measurementId: "G-0BHQ4G2KWC",
};

const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);

export const registerUser = async (email, password, additionalData) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    await setDoc(doc(db, "users", user.uid), {
      email,
      ...additionalData,
    });

    console.log("User registered:", user);
  } catch (error) {
    console.error("Error registering user:", error);
  }
};

export const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    console.log("User logged in:", user);
  } catch (error) {
    console.error("Error logging in user:", error);
  }
};
