// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"
import { getStorage} from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBBlbVt0Doz9mv3b12G7vCxz4c9SoXavRs",
  authDomain: "chats-r-us.firebaseapp.com",
  projectId: "chats-r-us",
  storageBucket: "chats-r-us.appspot.com",
  messagingSenderId: "1070564117624",
  appId: "1:1070564117624:web:6dd6849cfe98ae1f6ef18d"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);



export {storage, auth, db, app as default}
