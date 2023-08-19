import { initializeApp } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-analytics.js";
import { getFirestore, collection, addDoc, onSnapshot } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-firestore.js";


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
const db = getFirestore(app);

let dashboardInput = document.getElementById('dashboard-input')
let textArea = document.getElementById('text-area')
// console.log(textArea, dashboardInput)

let publishBtn = document.getElementById('publish-btn')

publishBtn.addEventListener('click', async () => {
    // console.log(textArea.value)
    // console.log(dashboardInput.value)
    const docRef = await addDoc(collection(db, "blog"), {
        textArea: textArea.value,
        dashboardInput: dashboardInput.value
    });
    console.log("Document written with ID: ", docRef.id)
})

const getBlogs = () => {
    onSnapshot(collection(db, 'blog'), (data) => {
        data.docChanges().forEach((blog) => {
            console.log('blogs', blog.doc.data())
            let showBlogs = document.getElementById('showBlogs')
            showBlogs.innerHTML +=
                `
               
                <div class="showpostDiv">
                <div class="setImgAndTitle">
                <img src="images/logo.webp" class="showPostPic">
                <div class="setDashInput">
                <h3 class='titleSet'>${blog.doc.data().dashboardInput}</h3>
                <div class="setNameAndMoment">
                <p>Anas Ansari</p> &nbsp &nbsp &nbsp &nbsp
                <p>${moment().format('MMMM Do YYYY')}</p>
                </div>
                <textarea placeholder="${blog.doc.data().textArea}" name="" id="text-Area" cols="60" rows="5"  disabled></textarea>
                <div class="btns">
                <button class="btn btn-primary editAndDeleteBtn">Edit</button>
                <button class="btn btn-primary editAndDeleteBtn">Delete</button>
                </div>
                </div>
                </div>
            `
            dashboardInput.value = ""
            textArea.value = ""
        })
    })
}
getBlogs()


let isTextAreaTrue = false
let editBlog = () => {
    if (isTextAreaTrue) {
        // showBlogs.childNodes
    }
}






let dashToLogin = () => {
    window.location.replace('login.html')
}
window.dashToLogin = dashToLogin
{/* <p>${blog.doc.data().textArea}</p> */ }
