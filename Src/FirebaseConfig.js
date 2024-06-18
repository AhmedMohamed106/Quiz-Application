 // Import the functions you need from the SDKs you need
 import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
 // TODO: Add SDKs for Firebase products that you want to use
 // https://firebase.google.com/docs/web/setup#available-libraries
 import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from  "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js"
 import{getFirestore, setDoc, doc} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js" // Your web app's Firebase configuration
 const firebaseConfig = {
   apiKey: "AIzaSyAzUtcwZ9iUoti3r_odFACoT2L69ilG_Qs",
   authDomain: "quiz-app-e8737.firebaseapp.com",
   databaseURL: "https://quiz-app-e8737-default-rtdb.firebaseio.com",
   projectId: "quiz-app-e8737",
   storageBucket: "quiz-app-e8737.appspot.com",
   messagingSenderId: "488376516249",
   appId: "1:488376516249:web:7b073ca83ee31c46b1c208"
 };

 // Initialize Firebase
 const app = initializeApp(firebaseConfig);


