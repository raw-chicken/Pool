// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA4Omc4TL9_yt6qyhNZO5HQcn7v6B1vyFc",
  authDomain: "pool-ff59e.firebaseapp.com",
  databaseURL: "https://pool-ff59e-default-rtdb.firebaseio.com",
  projectId: "pool-ff59e",
  storageBucket: "pool-ff59e.appspot.com",
  messagingSenderId: "72939662900",
  appId: "1:72939662900:web:676e14f785890802de6461"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Realtime Database and get a reference to the service
const database = getDatabase(app);
