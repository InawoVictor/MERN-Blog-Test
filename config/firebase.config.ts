// Import the functions you need from the SDKs you need
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAHESd7feavKlCqY9mLE5iBz7DTjlS5BZ0",
  authDomain: "vfireblog.firebaseapp.com",
  projectId: "vfireblog",
  storageBucket: "vfireblog.appspot.com",
  messagingSenderId: "550888097690",
  appId: "1:550888097690:web:756a9a623dc2fb21e75c23"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getStorage(app)