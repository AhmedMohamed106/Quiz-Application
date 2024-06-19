 import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js"
 import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from  "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js"
 import{getFirestore, setDoc, doc , getDoc} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js" // Your web app's Firebase configuration
 const firebaseConfig = {
   apiKey: "AIzaSyAzUtcwZ9iUoti3r_odFACoT2L69ilG_Qs",
   authDomain: "quiz-app-e8737.firebaseapp.com",
   databaseURL: "https://quiz-app-e8737-default-rtdb.firebaseio.com",
   projectId: "quiz-app-e8737",
   storageBucket: "quiz-app-e8737.appspot.com",
   messagingSenderId: "488376516249",
   appId: "1:488376516249:web:7b073ca83ee31c46b1c208"
 };

 const app = initializeApp(firebaseConfig);
 
 const firestore = firebase.firestore();

 async function loadQuizzes() {
     const quizzesContainer = document.getElementById('quizzesContainer');
     const querySnapshot = await firestore.collection('quizzes').get();
     querySnapshot.forEach((doc) => {
         const quiz = doc.data();
         const quizCard = document.createElement('div');
         quizCard.classList.add('col-md-4');
         quizCard.innerHTML = `
             <div class="card">
                 <div class="card-body">
                     <h5 class="card-title">${quiz.title}</h5>
                     <p class="card-category">Category: ${quiz.category}</p>
                     <p class="card-description">${quiz.description}</p>
                     <a href="quiz.html?id=${doc.id}" class="btn btn-primary">Start Quiz</a>
                 </div>
             </div>
         `;
         quizzesContainer.appendChild(quizCard);
     });
 }

 document.addEventListener('DOMContentLoaded', loadQuizzes);