import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase, ref, get } from "firebase/database";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC9t5m21qvuR6Y9MzCReIfBGDxm8xMbi6E",
  authDomain: "fusiongreen-93d54.firebaseapp.com",
  databaseURL: "https://fusiongreen-93d54-default-rtdb.firebaseio.com",
  projectId: "fusiongreen-93d54",
  storageBucket: "fusiongreen-93d54.appspot.com",
  messagingSenderId: "1069757343911",
  appId: "1:1069757343911:web:d42be153429f3f34d91382",
  measurementId: "G-BPY7HF2CE4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
export const auth = getAuth(app);

export { db, ref, get };