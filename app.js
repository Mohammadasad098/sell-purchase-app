import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
import { auth } from "./config.js";

const form = document.querySelector('#form')
const email = document.querySelector('#email')
const password = document.querySelector('#password')


form.addEventListener('submit' , async(event) => {
    event.preventDefault()
    signInWithEmailAndPassword(auth, email.value, password.value)
  .then((userCredential) => {
    const user = userCredential.user;
    console.log(user);
    email.value = ''
    password.value = ''
    window.location = 'addproduct.html'
    
    
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorMessage);
    
  });

})