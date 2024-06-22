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
 

   const auth = getAuth();
const db = getFirestore();

document.addEventListener('DOMContentLoaded', () => {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            const userId = user.uid;
            localStorage.setItem("loggedInUserId", userId);

            fetchUserQuizzes(userId);
        } else {
            console.error("No user is signed in.");
            localStorage.removeItem("loggedInUserId");
        }
    });

    const logoutButton = document.getElementById('logout');
    if (logoutButton) {
        logoutButton.addEventListener('click', () => {
            signOut(auth)
                .then(() => {
                    localStorage.removeItem('loggedInUserId');
                    window.location.href = '../components/homepage.html';
                })
                .catch((error) => {
                    console.error('Error signing out:', error);
                });
        });
    } else {
        console.error('Logout button not found');
    }
});

function fetchUserQuizzes(userId) {
    const userRef = doc(db, 'users', userId);

    getDoc(userRef)
        .then((userDoc) => {
            if (!userDoc.exists()) {
                throw new Error('User document not found');
            }

            const userData = userDoc.data();
            const quizzes = userData.quizzes || [];

            // Ensure the DOM is fully loaded before accessing elements
            document.addEventListener('DOMContentLoaded', () => {
                const nameElement = document.getElementById("user-Name");

                if (nameElement) {
                    if (userData.username) {
                        nameElement.textContent = `Welcome, ${userData.username}`;
                    } else {
                        console.error('User data does not contain a username');
                    }
                } else {
                    console.error('Element with ID "user-Name" not found');
                }

                const tableBody = document.querySelector('#quiz-table tbody');
                if (tableBody) {
                    tableBody.innerHTML = '';

                    let quizPromises = quizzes.map((quiz, index) => {
                        const quizRef = doc(db, 'quizzes', quiz.quizId);
                        return getDoc(quizRef)
                            .then((quizDoc) => {
                                let category = 'Unknown';
                                let questionsNumber = 'Unknown';

                                if (quizDoc.exists()) {
                                    const quizData = quizDoc.data();
                                    category = quizData.category || 'Unknown';
                                    questionsNumber = quizData.questions ? quizData.questions.length : 'Unknown';
                                }

                                const row = document.createElement('tr');

                                const quizNumberCell = document.createElement('td');
                                quizNumberCell.textContent = index + 1;
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
                                resultCell.textContent = JSON.stringify(quiz.result);
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
                                dateCell.textContent = quizDate.toLocaleString();
                                row.appendChild(dateCell);

                                tableBody.appendChild(row);
                            })
                            .catch((error) => {
                                console.error(`Error fetching quiz ${quiz.quizId}:`, error);
                            });
                    });

                    return Promise.all(quizPromises);
                } else {
                    throw new Error('Quiz table body not found');
                }
            });
        })
        .catch((error) => {
            console.error('Error fetching user quizzes:', error);
        });
}
