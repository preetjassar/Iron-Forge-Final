import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// NOTE FOR COLLEGE SUBMISSION:
// This config is safe to keep in the code — Firebase web API keys are not
// secret, they just identify which project to talk to. Access is actually
// controlled by the Firestore Security Rules you set in the Firebase console
// (see README.md in this project for the rules to paste in).
const firebaseConfig = {
    apiKey: "AIzaSyB8P5QcIXKU327VTdRNZ2Y7C8HFq4pQS60",
    authDomain: "iron-forge-gym-49938.firebaseapp.com",
    projectId: "iron-forge-gym-49938",
    storageBucket: "iron-forge-gym-49938.firebasestorage.app",
    messagingSenderId: "859172335782",
    appId: "1:859172335782:web:4bc89309e4f599e1268467",
    measurementId: "G-MRQVCYD6Z4"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);

export default app;
