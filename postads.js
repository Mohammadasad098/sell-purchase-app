import { onAuthStateChanged , signOut , } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
import { auth , db } from "./config.js";

onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;
      console.log(uid);
      
    } else {
        window.location = 'login.html'
    }
  });



  const logout = document.querySelector('#logout-btn')


  logout.addEventListener('click' , ()=> {
    signOut(auth).then(() => {
        console.log('logout successfully');
        window.location = 'login.html'
      }).catch((error) => {
        console.log(error);
        
      });
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorMessage);
    
  });