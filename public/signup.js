// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD5c-yJ0XB-ogNEMJJWTWKrtvOuTKZAros",
    authDomain: "nurture-academy-1324.firebaseapp.com",
    projectId: "nurture-academy-1324",
    storageBucket: "nurture-academy-1324.appspot.com",
    messagingSenderId: "1028297148824",
    appId: "1:1028297148824:web:4e1e976b8f768eac0043ed",
    measurementId: "G-DP4EM10W7F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Google Sign Up
document.getElementById('googleSignUp').addEventListener('click', () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
        .then((result) => {
            // Handle successful sign-in
            alert('Google sign-in successful!');
        })
        .catch((error) => {
            // Handle Errors here.
            console.error(error);
            alert('Error during Google sign-in.');
        });
});

// Phone Sign Up
window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
    'size': 'invisible',
    'callback': (response) => {
        // reCAPTCHA solved, allow signInWithPhoneNumber.
        onSignInSubmit();
    }
}, auth);

document.getElementById('phoneSignUp').addEventListener('click', () => {
    const phoneNumber = document.getElementById('phoneNumber').value;
    const appVerifier = window.recaptchaVerifier;

    signInWithPhoneNumber(auth, phoneNumber, appVerifier)
        .then((confirmationResult) => {
            const code = window.prompt('Enter OTP sent to your phone:');
            return confirmationResult.confirm(code);
        })
        .then((result) => {
            // Handle successful sign-in
            alert('Phone number sign-in successful!');
        })
        .catch((error) => {
            // Handle Errors here.
            console.error(error);
            alert('Error during phone number sign-in.');
        });
});
