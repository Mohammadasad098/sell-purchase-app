import { createUserWithEmailAndPassword ,
    sendPasswordResetEmail,
    GoogleAuthProvider,
    signInWithPopup,
    GithubAuthProvider,} from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
  import { auth } from "./config.js";
  
  const form = document.querySelector('#form')
  const email = document.querySelector('#email')
  const password = document.querySelector('#password')
  const firstname = document.querySelector('#firstname')
  const lastname = document.querySelector('#lastname')


  form.addEventListener('submit' , async(event) => {
    event.preventDefault()
    createUserWithEmailAndPassword(auth, email.value, password.value)
  .then((userCredential) => {
    const user = userCredential.user;
    console.log(user);
    firstname.value = ''
    lastname.value = ''
    email.value = ''
    password.value = ''
    window.location = 'index.html'
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorMessage);
  });

})