// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyADv5uVmQMYtzwv6S0nwSHhmafKX5isIcg",
  authDomain: "malayaliweds.firebaseapp.com",
  projectId: "malayaliweds",
  storageBucket: "malayaliweds.appspot.com",
  messagingSenderId: "37173645887",
  appId: "1:37173645887:web:ab922d429e8bf4aa6c9e8a",
  measurementId: "G-HLFLBREG2V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);