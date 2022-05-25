// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCZOzN1f1RitVES62Nu8F4wpbTFC6S0OPU",
  authDomain: "where-s-wally-98b11.firebaseapp.com",
  projectId: "where-s-wally-98b11",
  storageBucket: "where-s-wally-98b11.appspot.com",
  messagingSenderId: "408495571104",
  appId: "1:408495571104:web:6c64ae13c11097201909c5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//const db = getFirestore(app);

export default getFirestore();
