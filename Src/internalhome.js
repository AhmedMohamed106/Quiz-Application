 // Import the functions you need from the SDKs you need
 import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
 import {getAuth, onAuthStateChanged, signOut} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
 import{getFirestore, getDoc, doc} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js"
 
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
 
   const auth=getAuth();
   const db=getFirestore();
 
   onAuthStateChanged(auth, (user)=>{
     const loggedInUserId=localStorage.getItem('loggedInUserId');
     if(loggedInUserId){
         console.log(user);
         const docRef = doc(db, "users", loggedInUserId);
         getDoc(docRef)
         .then((docSnap)=>{
             if(docSnap.exists()){
                 const userData=docSnap.data();
                 document.getElementById('Name').innerHTML=`Welcome, ${userData.username}`; 
             }
             else{
                 console.log("no document found matching id")
             }
         })
         .catch((error)=>{
             console.log("Error getting document");
         })
     }
     else{
         console.log("User Id not Found in Local storage")
     }
   })
 
   const logoutButton=document.getElementById('logout');
 
   logoutButton.addEventListener('click',()=>{
     localStorage.removeItem('loggedInUserId');
     signOut(auth)
     .then(()=>{
         window.location.href='../components/homepage.html';
     })
     .catch((error)=>{
         console.error('Error Signing out:', error);
     })
   })