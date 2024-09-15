import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js";


const firebaseConfig = {
  apiKey: "AIzaSyC0KNDdHf3LpKH-tpyoV1dTCnxEP7QXfz4",
  authDomain: "sell-purchase-app-d9306.firebaseapp.com",
  projectId: "sell-purchase-app-d9306",
  storageBucket: "sell-purchase-app-d9306.appspot.com",
  messagingSenderId: "833549859513",
  appId: "1:833549859513:web:68c89e552aed3dab25f968",
  measurementId: "G-NSTDMN4DMJ"
};

initializeApp(firebaseConfig);

const db = getFirestore();
const colRef = collection(db, "products");

const div = document.querySelector('#div-cards');

const fetchAndRenderProducts = async () => {
  try {
    div.innerHTML = '<span class="loading loading-spinner loading-lg text-info"></span>';

    const snapshot = await getDocs(colRef);
    const products = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    if (products.length === 0) {
      div.innerHTML = '<p>No products available.</p>';
      return;
    }

    let htmlContent = '';
    products.forEach(product => {
      const imageUrl = product.imageUrl || 'default-image-url'; 
      htmlContent += `
        <div class="card bg-base-100 w-96 shadow-xl">
          <figure>
            <img class="w-48" src="${imageUrl}" alt="${product.title}" />
          </figure>
          <div class="card-body">
            <h2 class="card-title">${product.title}</h2>
            <p>${product.description}</p>
            <p>${product.price}</p>
            <div class="card-actions justify-end">
              <button class="deleteBtn btn btn-danger">Read More</button>
            </div>
          </div>
        </div>
        <hr>
      `;
    });


    div.innerHTML = htmlContent;

  } catch (error) {
    console.error("Error fetching documents: ", error);
    div.innerHTML = '<p>Failed to load products. Please try again later.</p>';
  }
};

fetchAndRenderProducts();
