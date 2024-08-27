// const div = document.querySelector('#render')

// let getData = JSON.parse(localStorage.getItem('userData'))
// console.log(getData);


// div.innerHTML += `
//  <div class="card bg-base-100 w-96 shadow-xl">
//   <figure>
//     <img
//       src=""
//       alt="Shoes" />
//   </figure>
//   <div class="card-body">
//     <h2 class="card-title">${getData.title}</h2>
//     <p>${getData.description}</p>
//     <p>${getData.price}</p>
//     <p>${getData.name}</p>
//     <p>${getData.contactNumber}</p>
//     <div class="card-actions justify-end">
//       <button class="deleteBtn btn btn-danger">Delete Ad</button>
//       <button class="editBtn btn btn-primary ">Edit Ad</button>
//     </div>
//   </div>
// </div>
// </hr>
        
// `


import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";
import { getFirestore , collection , getDocs} from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js";
const firebaseConfig = {
  apiKey: "AIzaSyC0KNDdHf3LpKH-tpyoV1dTCnxEP7QXfz4",
  authDomain: "sell-purchase-app-d9306.firebaseapp.com",
  projectId: "sell-purchase-app-d9306",
  storageBucket: "sell-purchase-app-d9306.appspot.com",
  messagingSenderId: "833549859513",
  appId: "1:833549859513:web:68c89e552aed3dab25f968",
  measurementId: "G-NSTDMN4DMJ"
};
initializeApp(firebaseConfig)

const db = getFirestore()


export const colRef =  collection(db , "products")

const div = document.querySelector('#render')

getDocs(colRef)
  .then((snapshot) => {
    const products = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    // Log the title of each product
    products.forEach(product => {
      div.innerHTML += `
      <div class="card bg-base-100 w-96 shadow-xl">
  <figure>
    <img
      src=""
      alt="Shoes" />
  </figure>
  <div class="card-body">
    <h2 class="card-title">${product.title}</h2>
    <p>${product.description}</p>
    <p>${product.price}</p>
    <p>${product.name}</p>
    <p>${product.contactNumber}</p>
    <div class="card-actions justify-end">
    <button>Read More </button>
    </div>
  </div>
</div>
</hr>
      `
      console.log(product);
    });
  })
  .catch((error) => {
    console.error("Error fetching documents: ", error);
  });
