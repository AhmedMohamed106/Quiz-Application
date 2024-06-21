/*
import { firestore, doc, getDoc } from "../Src/FirebaseConfig.js";

let currentQuestionIndex = 0;
let questions = [];
let timerInterval;
let totalQuizTime = 0; // Total quiz duration in seconds

function loadQuiz() {
  const urlParams = new URLSearchParams(window.location.search);
  const quizId = urlParams.get('id');
  
  if (!quizId) {
    alert('Quiz ID not found in URL');
    return;
  }

  getDoc(doc(firestore, 'quizzes', quizId))
    .then((quizDoc) => {
      if (quizDoc.exists) {
        const quizData = quizDoc.data();
        console.log('Quiz Data:', quizData); // Debugging
        questions = quizData.questions;
        totalQuizTime = questions.length * quizData.timeLimit; // Calculate total quiz time

        // Check if questions is an array and not empty
        if (Array.isArray(questions) && questions.length > 0) {
          showQuestion(currentQuestionIndex);
          startTimer(); // Start the quiz timer
        } else {
        }
      } else {
      }
    })
    .catch((error) => {
      console.error("Error loading quiz: ", error);
    });
}

function showQuestion(index) {
  clearInterval(timerInterval);
  const questionData = questions[index];

  if (questionData && questionData.options && typeof questionData.options === 'object') {
    // Convert options object to an array
    const optionsArray = Object.values(questionData.options);
    
    document.getElementById('questionText').innerText = questionData.question;
    const optionsContainer = document.getElementById('options-container');
    optionsContainer.innerHTML = '';

    optionsArray.forEach((option, i) => {
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

    startTimer(); // Restart the timer for each question
  } else {
    console.error('Question options are not valid:', questionData.options); // Debugging
  }
}

function startTimer() {
  let timeLeft = totalQuizTime;
  const timerElement = document.getElementById('Timer');
  timerElement.innerText = `Time left: ${timeLeft} seconds`;

  timerInterval = setInterval(() => {
    timeLeft--;
    timerElement.innerText = `Time left: ${timeLeft} seconds`;

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      nextQuestion(); // Automatically move to the next question or end quiz
    }
  }, 1000);
}

function nextQuestion() {
  if (currentQuestionIndex < questions.length - 1) {
    currentQuestionIndex++;
    showQuestion(currentQuestionIndex);
  } else {
    clearInterval(timerInterval);
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
document.getElementById('prev-btn').addEventListener('click', prevQuestion);
document.getElementById('next-btn').addEventListener('click', nextQuestion);

*/