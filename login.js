import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
// import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-analytics.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";


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
// const analytics = getAnalytics(app);
const auth = getAuth(app);

let loginBtn = document.getElementById('login-btn')
loginBtn && loginBtn.addEventListener('click',() => {
let loginEmail = document.getElementById('login-email')
let loginPassword = document.getElementById('login-password')
    signInWithEmailAndPassword(auth, loginEmail.value, loginPassword.value)
    .then((userCredential) => {
        const user = userCredential.user;
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Login Successful!',
            showConfirmButton: false,
            timer: 1500
          })
          window.location.replace('profile.html')
    })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage)
            Swal.fire({
                title: errorCode.slice(5),
                text: 'Try again!',
              })
        });
})

let goSignup = document.getElementById('go-signup')
goSignup.addEventListener('click', ()=>{
window.location.replace('index.html')
})