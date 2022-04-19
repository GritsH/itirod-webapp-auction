import {logInBtn,
    emailLogging,
    passwordLogging}from "./general.js"

import{ initializeApp}from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import{
    getAuth,
    signInWithEmailAndPassword
}from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyCxkqdo5AvSUt154BEK0ugZDE4aWuKHUME",
    authDomain: "auction-ee0c0.firebaseapp.com",
    projectId: "auction-ee0c0",
    storageBucket: "auction-ee0c0.appspot.com",
    messagingSenderId: "245231428131",
    appId: "1:245231428131:web:2772487fdb97d2b0a74796",
    measurementId: "G-FG6XBTHYJP"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
// connectAuthEmulator(auth, "http://localhost:9099/%22);
const loginEmailPassword = async () => {
    const loginEmail = emailLogging.value;
    localStorage.setItem('name',loginEmail);
    const loginPassword = passwordLogging.value;
    try {
        const userCredential = await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
        console.log(userCredential.user);
        window.location.href = '../html/loggedIn.html';
    } catch (error) {
        console.log(error);
    }
}
logInBtn.addEventListener("click", loginEmailPassword);