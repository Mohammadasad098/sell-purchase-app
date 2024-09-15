import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
import { auth, storage, ref, uploadBytesResumable, getDownloadURL } from "./config.js";

const form = document.querySelector('#form');
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const firstname = document.querySelector('#firstname');
const lastname = document.querySelector('#lastname');
const image = document.querySelector('#signup-image');
const submitButton = document.querySelector('#sub-button');


const uploadFile = async () => {
    const file = image.files[0]; 

    if (file.size > 10485760) {
        console.log('File is too large');
        alert('File size should not exceed 1MB.');
        return null;
    }

    const imagesRefWithFolder = ref(storage, `profilePic/${file.name}`);
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


form.addEventListener('submit', async (event) => {
    event.preventDefault(); 
    submitButton.innerHTML = `<h1>Loading...<h1/>`;


    if (!firstname.value || !lastname.value || !email.value || !password.value || !image.files.length) {
        alert('Please fill out all fields.');
        submitButton.innerHTML = "Submit";
        return;
    }

    try {
        const downloadURL = await uploadFile();

        if (!downloadURL) {
            submitButton.innerHTML = "Submit";
            return;
        }


        const userCredential = await createUserWithEmailAndPassword(auth, email.value, password.value);
        const user = userCredential.user;

        console.log('User:', user);
        console.log('Profile Image URL:', downloadURL);

        firstname.value = '';
        lastname.value = '';
        email.value = '';
        password.value = '';
        image.value = ''; 

        window.location = 'login.html';
    } catch (error) {
        console.log('Error:', error.message);
        submitButton.innerHTML = "Submit";
    }
});
