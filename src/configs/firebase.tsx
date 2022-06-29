import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_FIREBASE_KEY,
//   authDomain: process.env.REACT_APP_AUTH_DOMAIN,
//   projectId: process.env.REACT_APP_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
//   appId: process.env.REACT_APP_ID,
// };

const firebaseConfig = {
  apiKey: "AIzaSyDHTdjcU5pQ4wHHB1Dx9BZ68il4D5GYJT4",
  authDomain: "break--out.firebaseapp.com",
  projectId: "break--out",
  storageBucket: "break--out.appspot.com",
  messagingSenderId: "569366671990",
  appId: "1:569366671990:web:662d30435069c403f6e557",
};

const app = initializeApp(firebaseConfig);
const googleAuthProvider = new GoogleAuthProvider();
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { app, auth, db, googleAuthProvider, storage };
