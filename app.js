import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";
// import{ getUserData } from '/profile.js'


const firebaseConfig = {
    apiKey: "AIzaSyDYhJy57a59Te9yjruJ7IAlJ7br_ZWqWp8",
    authDomain: "mini-hackathone-3deb8.firebaseapp.com",
    databaseURL: "https://mini-hackathone-3deb8-default-rtdb.firebaseio.com",
    projectId: "mini-hackathone-3deb8",
    storageBucket: "mini-hackathone-3deb8.appspot.com",
    messagingSenderId: "151303180207",
    appId: "1:151303180207:web:c700b11d2fb2e4ee8fe95a",
    measurementId: "G-DM1XHKN77N"
  };

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);


// let loginBtn = document.getElementById('login-btn'); 
let signUpBtn = document.getElementById('sign-up-btn');
signUpBtn && signUpBtn.addEventListener('click', () => {
    let fname = document.getElementById('fname')
    let lname = document.getElementById('lname')
    let signUpEmail = document.getElementById('email')
    let signUpPassword = document.getElementById('password')
    createUserWithEmailAndPassword(auth, signUpEmail.value, signUpPassword.value, fname.value, lname.value)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log(user)
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Login Successful!',
                showConfirmButton: false,
                timer: 1500
            })
            window.location.replace('login.html')
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log("Error==>", errorMessage)
            Swal.fire({
                title: errorCode.slice(5),
                text: 'Try again!',
            })
        });
})

let goLogin = document.getElementById('go-login')
goLogin.addEventListener('click', () => {
    window.location.replace('login.html')
})

