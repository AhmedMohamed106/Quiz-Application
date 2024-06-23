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
  initializeApp(firebaseConfig);
 

const auth = getAuth();
const db = getFirestore();
/*
document.addEventListener('DOMContentLoaded', () => {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            const userId = user.uid;
            localStorage.setItem("loggedInUserId", userId);

            fetchUserQuizzes(userId);
        } else {

            console.error("No user is signed in.");
            localStorage.removeItem("loggedInUserId");
            window.location.href = "../components/homepage.html";
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
  
    return getDoc(userRef)
      .then((userDoc) => {
        if (!userDoc.exists()) {
          throw new Error('User document not found');
        }
  
        const userData = userDoc.data();
        const quizzes = userData.quizzes || [];
  
        const nameElement = document.getElementById("user-Name");
        if (nameElement) {
          if (userData.username) {
            nameElement.textContent = `Welcome, ${userData.username}`;
            nameElement.style.display = "block"; // Ensure it's visible
          } else {
            console.error('User data does not contain a username');
          }
        } else {
          console.error('Element with ID "user-Name" not found');
        }
  
        const tableBody = document.querySelector('#quiz-table tbody');
        if (!tableBody) {
          throw new Error('Quiz table body not found');
        }
  
        tableBody.innerHTML = ''; // Clear existing rows
  
        const quizPromises = quizzes.map((quiz, index) => {
          const quizRef = doc(db, 'quizzes', quiz.quizId);
          return getDoc(quizRef)
            .then((quizDoc) => {
              if (!quizDoc.exists()) {
                console.warn(`Quiz document ${quiz.quizId} not found`);
                return null; // Skip to the next quiz
              }
  
              const quizData = quizDoc.data();
              const category = quizData.category || 'Unknown';
              const questionsNumber = quizData.questions ? quizData.questions.length : 'Unknown';
  
              const quizDate = quiz.date && quiz.date.toDate ? quiz.date.toDate() : new Date(quiz.date);
              const formattedDate = quizDate.toLocaleString();
  
              const row = document.createElement('tr');
              row.innerHTML = `
                <td>${index + 1}</td>
                <td>${category}</td>
                <td>${questionsNumber}</td>
                <td>${quiz.score}</td>
                <td>${JSON.stringify(quiz.result)}</td>
                <td>${formattedDate}</td>
              `;
  
              tableBody.appendChild(row);
            })
            .catch((error) => {
              console.error(`Error fetching quiz ${quiz.quizId}:`, error);
            });
        });
  
        return Promise.all(quizPromises);
      })
      .catch((error) => {
        console.error('Error fetching user quizzes:', error);
      });
  }
  
  */

  document.addEventListener('DOMContentLoaded', () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const userId = user.uid;
        localStorage.setItem("loggedInUserId", userId);
  
        fetchUserQuizzes(userId);
      } else {
        console.error("No user is signed in.");
        localStorage.removeItem("loggedInUserId");
        window.location.href = "../components/homepage.html";
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
  
    return getDoc(userRef)
      .then((userDoc) => {
        if (!userDoc.exists()) {
          throw new Error('User document not found');
        }
  
        const userData = userDoc.data();
        const quizzes = userData.quizzes || [];
  
        const nameElement = document.getElementById("user-Name");
        if (nameElement) {
          if (userData.username) {
            nameElement.textContent = `Welcome, ${userData.username}`;
            nameElement.style.display = "block"; // Ensure it's visible
          } else {
            console.error('User data does not contain a username');
          }
        } else {
          console.error('Element with ID "user-Name" not found');
        }
  
        const tableBody = document.querySelector('#quiz-table tbody');
        if (!tableBody) {
          throw new Error('Quiz table body not found');
        }
  
        tableBody.innerHTML = ''; // Clear existing rows
  
        const quizPromises = quizzes.map((quiz, index) => {
          const quizRef = doc(db, 'quizzes', quiz.quizId);
          return getDoc(quizRef)
            .then((quizDoc) => {
              if (!quizDoc.exists()) {
                console.warn(`Quiz document ${quiz.quizId} not found`);
                return null; // Skip to the next quiz
              }
  
              const quizData = quizDoc.data();
              const category = quizData.category || 'Unknown';
              const questionsNumber = quizData.questions ? quizData.questions.length : 'Unknown';
              const formattedDate = quiz.date ? new Date(quiz.date.seconds * 1000).toLocaleString() : 'Unknown';
  
              const row = document.createElement('tr');
              row.innerHTML = `
                <td>${index + 1}</td>
                <td>${category}</td>
                <td>${questionsNumber}</td>
                <td>${quiz.score}</td>
                <td>${JSON.stringify(quiz.result)}</td>
                <td>${formattedDate}</td>
              `;
  
              tableBody.appendChild(row);
            })
            .catch((error) => {
              console.error(`Error fetching quiz ${quiz.quizId}:`, error);
            });
        });
  
        return Promise.all(quizPromises);
      })
      .catch((error) => {
        console.error('Error fetching user quizzes:', error);
      });
  }
  