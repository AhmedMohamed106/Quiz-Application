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

   
   async function fetchUserQuizzes(userId) {
    const userRef = doc(db, 'users', userId);

    try {
        const userDoc = await getDoc(userRef);

        if (userDoc.exists()) {
            const userData = userDoc.data();
            const quizzes = userData.quizzes || [];

            const tableBody = document.querySelector('#quiz-table tbody');
            tableBody.innerHTML = '';

            for (let i = 0; i < quizzes.length; i++) {
                const quiz = quizzes[i];
                const quizRef = doc(db, 'quizzes', quiz.quizId);
                const quizDoc = await getDoc(quizRef);

                let category = 'Unknown';
                let questionsNumber = 'Unknown';

                if (quizDoc.exists()) {
                    const quizData = quizDoc.data();
                    category = quizData.category || 'Unknown';
                    questionsNumber = quizData.questions ? quizData.questions.length : 'Unknown';
                }

                const row = document.createElement('tr');

                const quizNumberCell = document.createElement('td');
                quizNumberCell.textContent = i + 1;
                row.appendChild(quizNumberCell);

                const categoryCell = document.createElement('td');
                categoryCell.textContent = category;
                row.appendChild(categoryCell);

                const questionsNumberCell = document.createElement('td');
                questionsNumberCell.textContent = questionsNumber;
                row.appendChild(questionsNumberCell);

                const scoreCell = document.createElement('td');
                scoreCell.textContent = quiz.score;
                row.appendChild(scoreCell);

                const resultCell = document.createElement('td');
                resultCell.textContent = JSON.stringify(quiz.result); // Displaying result as JSON string
                row.appendChild(resultCell);

                const dateCell = document.createElement('td');
                let quizDate;
                if (quiz.date && quiz.date.toDate) {
                    quizDate = quiz.date.toDate();
                } else if (quiz.date && !isNaN(quiz.date.seconds)) {
                    quizDate = new Date(quiz.date.seconds * 1000);
                } else {
                    quizDate = new Date(quiz.date);
                }
                dateCell.textContent = quizDate.toLocaleString(); // Format date to a readable string
                row.appendChild(dateCell);

                tableBody.appendChild(row);
            }
        } else {
            console.error('User document not found');
        }
    } catch (error) {
        console.error('Error fetching user quizzes:', error);
    }
}
fetchUserQuizzes(localStorage.getItem("LoggedInUserId"));

   onAuthStateChanged(auth, (user)=>{
     const loggedInUserId=localStorage.getItem('loggedInUserId');
     if(loggedInUserId){
         console.log(user);
         const docRef = doc(db, "users", loggedInUserId);
         getDoc(docRef)
         .then((docSnap)=>{
             if(docSnap.exists()){
                
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
     signOut(auth)
     .then(()=>{
        localStorage.removeItem('loggedInUserId');
         window.location.href='../components/homepage.html';
     })
     .catch((error)=>{
         console.error('Error Signing out:', error);
     })
   })

   