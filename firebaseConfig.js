// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database"
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { getFirestore} from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_API_KEY,
    authDomain: import.meta.env.VITE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
//export const database = getDatabase(app)

const provider = new GoogleAuthProvider();


export const fireStoreDB = getFirestore();


// Function to log in with Google
export const loginWithGoogle = async () => {
    signInWithPopup(auth, provider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;
    localStorage.setItem("user", JSON.stringify(user));
    }).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.customData.email;
      const credential = GoogleAuthProvider.credentialFromError(error);
    });
};

// Function to log out
export const logout = async () => {
  try {
    await signOut(auth);
    console.log("User logged out successfully");
  } catch (error) {
    console.error("Error during logout:", error.message);
    throw error;
  }
};