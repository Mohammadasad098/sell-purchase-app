import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js";
import { getStorage, ref, uploadBytes, getDownloadURL , uploadBytesResumable } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyC0KNDdHf3LpKH-tpyoV1dTCnxEP7QXfz4",
  authDomain: "sell-purchase-app-d9306.firebaseapp.com",
  projectId: "sell-purchase-app-d9306",
  storageBucket: "sell-purchase-app-d9306.appspot.com",
  messagingSenderId: "833549859513",
  appId: "1:833549859513:web:68c89e552aed3dab25f968",
  measurementId: "G-NSTDMN4DMJ"
};


const app = initializeApp(firebaseConfig);


const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);


export { app, auth, db, storage, ref, uploadBytes, getDownloadURL , uploadBytesResumable };
