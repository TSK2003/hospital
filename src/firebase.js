// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCRSWGWFdnUATENOvD1AktA1V-mz1FSJPw",
  authDomain: "hospital-ee927.firebaseapp.com",
  projectId: "hospital-ee927",
  storageBucket: "hospital-ee927.firebasestorage.app",
  messagingSenderId: "343880598469",
  appId: "1:343880598469:web:efb42df8074ff022adc1ac",
  measurementId: "G-WC9T0JQC3K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Analytics conditionally (safeguards SSR / non-browser environments)
let analytics = null;
if (typeof window !== 'undefined') {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  }).catch(() => {
    // Analytics fallback
  });
}

export { app, analytics };
export default app;
