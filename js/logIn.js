import {
    logInBtn,
    emailLogging,
    passwordLogging, errorEmail, noUser, errorPassword,
    userEmail
} from "./general.js"

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
const loginEmailPassword = async () => {
    const loginEmail = emailLogging.value;
    localStorage.setItem('name',loginEmail);
    const loginPassword = passwordLogging.value;
    try {
        const userCredential = await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
        console.log(userCredential.user);
        window.location.href = 'html/loggedIn.html';
        //document.getElementById('userEmail').innerHTML = loginEmail;
    } catch (error) {
        let errCode = error.code;
        if(errCode === 'auth/invalid-email'){
            emailLogging.setAttribute('class', 'error');
            errorEmail.removeAttribute('hidden');
            noUser.removeAttribute('hidden');
            console.log(error);
        } else if (errCode === 'auth/wrong-password'){
            passwordLogging.setAttribute('class', 'error');
            errorPassword.removeAttribute('hidden');
            noUser.setAttribute('hidden', true);
            console.log(error)
        }else {
            errorEmail.setAttribute('hidden', true);
            errorPassword.setAttribute('hidden', true);
            noUser.removeAttribute('hidden');
            console.log(error);
        }
    }
}
logInBtn.addEventListener("click", loginEmailPassword);