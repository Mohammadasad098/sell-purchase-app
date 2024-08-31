import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
import { auth, db } from "./config.js";
import {
  collection,
  addDoc,
} from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js";

const logout = document.querySelector('#logout-btn');
const form = document.querySelector("#form");
const title = document.querySelector("#title");
const description = document.querySelector("#description");
const price = document.querySelector("#price");
const name = document.querySelector("#name");
const contactNumber = document.querySelector("#contact-number");
const profileImg = document.querySelector("#profile-img");

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

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const titleValue = title.value.trim();
    const descriptionValue = description.value.trim();
    const priceValue = price.value.trim();
    const nameValue = name.value.trim();
    const contactNumberValue = contactNumber.value.trim();

    if (!titleValue || !descriptionValue || !priceValue || !nameValue || !contactNumberValue) {
        alert("All fields must be filled out.");
        return;
    }

    try {
        // Add the form data to Firestore
        await addDoc(collection(db, "products"), {
            title: titleValue,
            description: descriptionValue,
            price: priceValue,
            name: nameValue,
            contactNumber: contactNumberValue,
        });
        console.log("Document successfully added to Firestore.");
form.reset()
        // Redirect to the index.html page after successful submission
        window.location.href = 'renderads.html';
    } catch (e) {
        console.error("Error adding document: ", e);
    }
});

