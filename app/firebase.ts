// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: process.env.FIREBASE_API,
	authDomain: "nixer-5c370.firebaseapp.com",
	projectId: "nixer-5c370",
	storageBucket: "nixer-5c370.appspot.com",
	messagingSenderId: "1016067639628",
	appId: "1:1016067639628:web:f8bd8a85dc6a62bebc27e9",
	measurementId: "G-B3HWYE907S",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
