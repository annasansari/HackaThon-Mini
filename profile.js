// import { fname, lname, signUpEmail } from "./app.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import { getStorage, ref, uploadBytes, uploadBytesResumable, getDownloadURL, deleteObject } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-storage.js";
import { getFirestore, doc, getDoc, updateDoc, addDoc,onSnapshot } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";
import { getAuth, updatePassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";



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
const storage = getStorage();
const auth = getAuth();
const db = getFirestore(app);

// let oldPassword = document.getElementById('oldPassword')
// let MyNewPassword = document.getElementById('newPassword')
// let repeatPassword = document.getElementById('repeatPassword')
// let updatePass = document.getElementById('update-pass')


const uploadFile = (file) => {
    return new Promise((reslove, reject) => {
        const mountainsRef = ref(storage, `images/${file.name}`);
        const uploadTask = uploadBytesResumable(mountainsRef, file);
        uploadTask.on('state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused');
                        break;
                    case 'running':
                        console.log('Upload is running');
                        break;
                }
            },
            (error) => {
                reject(error)
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    reslove(downloadURL);
                });
            }
        );
    })
}

let updatebtn = document.getElementById('update-Btn')
updatebtn && updatebtn.addEventListener('click', async () => {
    try {
        let file = document.getElementById('file')
        const res = await uploadFile(file.files[0])
        console.log('URL', res)
        let imgSet = document.getElementById('img-set')
        imgSet.src = res
    }
    catch (err) {
        console.log('err-->', err)
    }
})


let logoutBtn = document.getElementById("go-login")
logoutBtn && logoutBtn.addEventListener('click', () => {
    window.location.replace('login.html')
})

let inputEditOn = false
let penClick = document.getElementById('pen-click')
let showSaveBtn = document.getElementById('show-save-btn')
let userName = document.getElementById('userName')

penClick.addEventListener('click', () => {
    if (inputEditOn) {
        penClick.style.display = 'none'
        showSaveBtn.style.display = 'block'
        userName.disabled = false
        inputEditOn = false
        userName.style.border = "1px solid #000"
    }
    else {
        userName.disabled = true
        inputEditOn = true
    }
})

showSaveBtn.addEventListener('click', () => {
    userName.value = userName.value
    userName.style.border = 'none'
    showSaveBtn.style.display = 'none'
    penClick.style.display = 'block'
})



onAuthStateChanged(auth, (user) => {
    if (user) {
        const uid = user.uid;
        console.log(user);

        function getData() {
            onSnapshot(doc(db, "Users", uid), (doc) => {
                // userName.value = doc.data().fullname;
                let updatePass = document.getElementById('update-pass')
                let MyNewPassword = document.getElementById('newPassword')
                let repeatPassword = document.getElementById('repeatPassword')
                let oldPassword = document.getElementById('oldPassword')

                updatePass.addEventListener("click", () => {
                    if (MyNewPassword.value.trim() === "" && repeatPassword.value === "") {
                        alert('Please enter password')
                     }
                    else if (oldPassword.value != doc.data().oldPassword) {
                        let newPassErr = document.getElementById('newPassErr')
                        let oldPassErr = document.getElementById('oldPassErr')
                        newPassErr.innerText = "";
                        oldPassErr.innerText = "Enter correct password";
                    }
                    // else if (MyNewPassword.value != repeatPassword.value) {
                    //     incorrectOldPass.innerText = "";
                    //     incorrectRepeatPass.innerText = "";
                    //     incorrectRepeatPass.innerText = "Password is not same";
                    // }
                    else {
                        updatePassword(user, MyNewPassword.value).then(() => {
                            newPassErr.innerText = "";
                            oldPassErr.innerText = "";
                            console.log("Update successful.");


                            updatePass(uid, MyNewPassword.value);

                        }).catch((error) => {
                            console.log(error.message);
                            if (error.message == "Firebase: Error (auth/requires-recent-login).") {
                                signOut(auth).then(() => {
                                    location.pathname = "/index.html";
                                }).catch((error) => {
                                    console.log("An error happened.", error);
                                });
                            }
                        });
                    }
                })
            });
        }
        getData();


    } else {
        console.log("User is signed out");
    }
});
async function updatePass(id, newpassword) {
    await updateDoc(doc(db, "Users", id), {
        oldpassword: newpassword
    });
}
window.updatePass = updatePass