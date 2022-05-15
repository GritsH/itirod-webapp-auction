import {
    differentPasswords, emailSignup,
    passwordSignup,
    repeatPassword,
    signUpBtn,
    errorPassword, errorEmail,
    invalidData, emailLogging

} from "./general.js"

import {initializeApp} from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import {createUserWithEmailAndPassword, getAuth,} from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";

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
const createAccount = async () => {
    const regEmail = emailSignup.value;
    const regPassword = passwordSignup.value;
    const regRepeatPassword = repeatPassword.value;
    try {
        if (regPassword === regRepeatPassword) {
            const userCredential = await createUserWithEmailAndPassword(auth, regEmail, regPassword);
            console.log(userCredential.user);
            window.location.href = '../index.html';
        }
        passwordSignup.setAttribute('class', 'error');
        repeatPassword.setAttribute('class', 'error');
        differentPasswords.removeAttribute('hidden');
        errorPassword.removeAttribute('hidden');
    } catch (error) {
        let errorCode = error.code;
        if (errorCode === 'auth/invalid-email') {
            emailSignup.setAttribute('class', 'error');
            errorEmail.removeAttribute('hidden');
            differentPasswords.setAttribute('hidden', true);
            console.log(error);
        } else if (errorCode === 'auth/weak-password') {
            emailSignup.removeAttribute('class');
            errorEmail.setAttribute('hidden', true);
            passwordSignup.setAttribute('class', 'error');
            repeatPassword.setAttribute('class', 'error');
            errorPassword.removeAttribute('hidden');
            differentPasswords.setAttribute('hidden', true);
            console.log(error);
        } else {
            invalidData.removeAttribute('hidden');
            differentPasswords.setAttribute('hidden', true);
            console.log(error);
        }
    }
}
signUpBtn.addEventListener("click", createAccount);
