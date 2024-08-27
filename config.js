import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
import { getFirestore , collection } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyC0KNDdHf3LpKH-tpyoV1dTCnxEP7QXfz4",
  authDomain: "sell-purchase-app-d9306.firebaseapp.com",
  projectId: "sell-purchase-app-d9306",
  storageBucket: "sell-purchase-app-d9306.appspot.com",
  messagingSenderId: "833549859513",
  appId: "1:833549859513:web:68c89e552aed3dab25f968",
  measurementId: "G-NSTDMN4DMJ"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);


// Import the functions you need from the SDKs you need
// import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
// import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
// import { getFirestore  } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";


// const firebaseConfig = {
//     apiKey: "AIzaSyChqmYvJAxFyH8IJrBdscYwhmbSIqwVrg4",
//     authDomain: "buy-sells-corner-b.firebaseapp.com",
//     projectId: "buy-sells-corner-b",
//     storageBucket: "buy-sells-corner-b.appspot.com",
//     messagingSenderId: "667411498745",
//     appId: "1:667411498745:web:0904d28bce300a38344428",
//     measurementId: "G-JVV4T46LD5"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// export const auth = getAuth(app);
// export const db = getFirestore(app);