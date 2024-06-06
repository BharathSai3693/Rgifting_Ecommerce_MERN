// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB1L3HP6_WfQPI4xJqdVQGpEjO9ub1mmHo",
  authDomain: "rgifting-7313d.firebaseapp.com",
  projectId: "rgifting-7313d",
  storageBucket: "rgifting-7313d.appspot.com",
  messagingSenderId: "110547986457",
  appId: "1:110547986457:web:d0226955d1717a3c36a288",
  measurementId: "G-64ND1M1DXY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const analytics = getAnalytics(app);