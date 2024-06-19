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

        let currentQuestionIndex = 0;
        let questions = [];
        let timerInterval;
        const timeLimit = 30; // Time limit for each question in seconds

        async function loadQuiz() {
            const urlParams = new URLSearchParams(window.location.search);
            const quizId = urlParams.get('id');
            const quizDoc = await firestore.collection('quizzes').doc(quizId).get();

            if (quizDoc.exists) {
                const quizData = quizDoc.data();
                questions = quizData.questions;
                showQuestion(currentQuestionIndex);
            } else {
                alert('Quiz not found!');
            }
        }

        function showQuestion(index) {
            clearInterval(timerInterval);
            const questionData = questions[index];
            document.getElementById('questionText').innerText = questionData.question;
            const optionsContainer = document.getElementById('optionsContainer');
            optionsContainer.innerHTML = '';
            questionData.options.forEach((option, i) => {
                const optionElement = document.createElement('div');
                optionElement.classList.add('form-check');
                optionElement.innerHTML = `
                    <input class="form-check-input" type="radio" name="question${index}" id="option${i}" value="${option}">
                    <label class="form-check-label" for="option${i}">
                        ${option}
                    </label>
                `;
                optionsContainer.appendChild(optionElement);
            });
            startTimer();
        }

        function startTimer() {
            let timeLeft = timeLimit;
            const timerElement = document.getElementById('questionTimer');
            timerElement.innerText = `Time left: ${timeLeft} seconds`;

            timerInterval = setInterval(() => {
                timeLeft--;
                timerElement.innerText = `Time left: ${timeLeft} seconds`;

                if (timeLeft <= 0) {
                    clearInterval(timerInterval);
                    nextQuestion();
                }
            }, 1000);
        }

        function nextQuestion() {
            if (currentQuestionIndex < questions.length - 1) {
                currentQuestionIndex++;
                showQuestion(currentQuestionIndex);
            } else {
                alert('You have completed the quiz!');
                // Redirect to a results page or show results
            }
        }

        function prevQuestion() {
            if (currentQuestionIndex > 0) {
                currentQuestionIndex--;
                showQuestion(currentQuestionIndex);
            }
        }

        document.addEventListener('DOMContentLoaded', loadQuiz);

