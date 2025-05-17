import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyCZHAD91y4bHkNMp-nxcpP1SYQ6DCAJDpc",
  authDomain: "leada-ai-4d9d6.firebaseapp.com",
  projectId: "leada-ai-4d9d6",
  storageBucket: "leada-ai-4d9d6.firebasestorage.app",
  messagingSenderId: "816049493853",
  appId: "1:816049493853:web:7bdaa56b522f35e27c7ab4",
  measurementId: "G-TJ96QS3PHL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize firebase Authentication and get a reference to the service

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const analytics = getAnalytics(app);