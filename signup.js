import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
import { auth, storage, ref, uploadBytes, getDownloadURL } from "./config.js";

const form = document.querySelector('#form');
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const firstname = document.querySelector('#firstname');
const lastname = document.querySelector('#lastname');
const image = document.querySelector('#signup-image');

const uploadFile = async () => {
    const files = image.files[0];
    if (!files) return null;

    const imagesRef = ref(storage, files.name);
    await uploadBytes(imagesRef, files);
    
    const downloadURL = await getDownloadURL(imagesRef);
    return downloadURL;
}

form.addEventListener('submit', async (event) => {
    event.preventDefault();


    if (!firstname.value || !lastname.value || !email.value || !password.value || !image.files.length) {
        alert('Please fill out all fields.');
        return;
    }

    try {
        const downloadURL = await uploadFile();

        const userCredential = await createUserWithEmailAndPassword(auth, email.value, password.value);
        const user = userCredential.user;

        console.log('User:', user);
        console.log('Profile Image URL:', downloadURL);


        firstname.value = '';
        lastname.value = '';
        email.value = '';
        password.value = '';


        window.location = 'login.html';
    } catch (error) {
        console.log('Error:', error.message);
    }
});