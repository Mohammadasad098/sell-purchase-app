import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
import { auth, db } from "./config.js";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
  query,
} from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js";

const logout = document.querySelector('#logout-btn');
const form = document.querySelector("#form");
const title = document.querySelector("#title");
const description = document.querySelector("#description");
const price = document.querySelector("#price");
const name = document.querySelector("#name");
const contactNumber = document.querySelector("#contact-number");
const Renderdiv = document.querySelector("#renderdiv");

onAuthStateChanged(auth, (user) => {
    if (user) {
        const uid = user.uid;
        console.log(uid);
    } else {
        window.location = 'index.html';
    }
});

logout.addEventListener('click', () => {
    signOut(auth).then(() => {
        console.log('Logout successfully');
        window.location = 'index.html';
    }).catch((error) => {
        console.log(error);
    });
});


let arr = [];

async function getData() {
    arr = [];
    const q = query(collection(db, "products"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        arr.push({ ...doc.data(), id: doc.id });
    });
    console.log(arr);
    renderTodo();
}
getData();


function renderTodo() {
  Renderdiv.innerHTML = "";
    if (arr.length === 0) {
      Renderdiv.innerHTML = "";
        return;
    }
    arr.forEach((item) => {
      Renderdiv.innerHTML += `
      <div class="card bg-base-100 w-96 shadow-xl">
  <figure>
    <img
      src=""
      alt="Shoes" />
  </figure>
  <div class="card-body">
    <h2 class="card-title">${item.title}</h2>
    <p>${item.description}</p>
    <p>${item.price}</p>
    <p>${item.name}</p>
    <p>${item.contactNumber}</p>
    <div class="card-actions justify-end">
      <button class="deleteBtn btn btn-danger">Delete Ad</button>
      <button class="editBtn btn btn-primary ">Edit Ad</button>
    </div>
  </div>
</div>
</hr>
        `;
    });

    const deleteButtons = document.querySelectorAll(".deleteBtn");
    const editButtons = document.querySelectorAll(".editBtn");

    deleteButtons.forEach((btn, index) => {
        btn.addEventListener("click", async () => {
            const id = arr[index].id;
            await deleteDoc(doc(db, "products", id));
            console.log("Data deleted");
            arr.splice(index, 1);
            renderTodo();
        });
    });

    editButtons.forEach((btn, index) => {
        btn.addEventListener("click", async () => {
            const updatedTitle = prompt("Enter new title:", arr[index].title);
            const updatedDescription = prompt("Enter new description:", arr[index].description);
            const updatedPrice = prompt("Enter new price:", arr[index].price);
            const updatedName = prompt("Enter new name:", arr[index].name);
            const updatedContactNumber = prompt("Enter new contact number:", arr[index].contactNumber);

            if (updatedTitle !== null && updatedDescription !== null && updatedPrice !== null && updatedName !== null && updatedContactNumber !== null) {
                const productUpdate = doc(db, "products", arr[index].id);
                await updateDoc(productUpdate, {
                    title: updatedTitle,
                    description: updatedDescription,
                    price: updatedPrice,
                    name: updatedName,
                    contactNumber: updatedContactNumber,
                });
                console.log("Data updated");
                arr[index].title = updatedTitle;
                arr[index].description = updatedDescription;
                arr[index].price = updatedPrice;
                arr[index].name = updatedName;
                arr[index].contactNumber = updatedContactNumber;
                renderTodo();
            }
        });
    });
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const titleValue = title.value.trim();
  const descriptionValue = description.value.trim();
  const priceValue = price.value.trim();
  const nameValue = name.value.trim();
  const contactNumberValue = contactNumber.value.trim();


  localStorage.setItem('title' , titleValue);
  localStorage.setItem('description' , descriptionValue);
  localStorage.setItem('price' , priceValue);
  localStorage.setItem('name' , nameValue);
  localStorage.setItem('contactNumber' , contactNumberValue);


  try {
      const docRef = await addDoc(collection(db, "products"), {
          title: titleValue,
          description: descriptionValue,
          price: priceValue,
          name: nameValue,
          contactNumber: contactNumberValue,
      });
      console.log("Document written with ID: ", docRef.id);
      arr.push({
        title: titleValue,
        description: descriptionValue,
        price: priceValue,
        name: nameValue,
        contactNumber: contactNumberValue,
          id: docRef.id,
      });
      renderTodo();
      title.value = "";
      description.value = "";
      price.value = "";
      name.value = "";
      contactNumber.value = "";
  } catch (e) {
      console.error("Error adding document: ", e);
  }
});