import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
import { auth } from "./config.js";

const form = document.querySelector('#form')
const email = document.querySelector('#email')
const password = document.querySelector('#password')
const submitButton = document.querySelector('#login-btn')


form.addEventListener('submit' , async(event) => {
    event.preventDefault()
    submitButton.innerHTML = `<h1>Loading...<h1/>`
    signInWithEmailAndPassword(auth, email.value, password.value)
  .then((userCredential) => {
    const user = userCredential.user;
    console.log(user);
    email.value = ''
    password.value = ''
    window.location = 'postads.html'
    
    
  })
})