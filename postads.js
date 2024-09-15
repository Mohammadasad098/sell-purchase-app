import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
import { auth, db, storage, ref, uploadBytesResumable, getDownloadURL } from "./config.js";
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js";

const logout = document.querySelector('#logout-btn');
const form = document.querySelector("#form");
const title = document.querySelector("#title");
const description = document.querySelector("#description");
const price = document.querySelector("#price");
const name = document.querySelector("#name");
const contactNumber = document.querySelector("#contact-number");
const productImg = document.querySelector("#productImage");


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


const uploadFile = async () => {
    const file = productImg.files[0];

    if (file.size > 10485760) {
        console.log('File is too large');
        alert('File size should not exceed 1MB.');
        return null;
    }

    const imagesRefWithFolder = ref(storage, `productPic/${file.name}`);
    const uploadTask = uploadBytesResumable(imagesRefWithFolder, file);

    return new Promise((resolve, reject) => {
        uploadTask.on('state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
            },
            (error) => {
                console.log('Upload failed:', error);
                reject(error);
            },
            async () => {
                const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                resolve(downloadURL);
            }
        );
    });
};


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
        let imageUrl = null;

        if (productImg.files.length > 0) {
            imageUrl = await uploadFile();
        }

        await addDoc(collection(db, "products"), {
            title: titleValue,
            description: descriptionValue,
            price: priceValue,
            name: nameValue,
            contactNumber: contactNumberValue,
            imageUrl: imageUrl 
        });

        console.log("Document successfully added to Firestore.");
        form.reset();
        window.location.href = 'renderads.html'; 
    } catch (e) {
        console.error("Error adding document: ", e);
    }
});

