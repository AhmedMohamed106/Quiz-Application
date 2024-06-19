import { firestore, doc, getDoc } from "../Src/FirebaseConfig.js";

let currentQuestionIndex = 0;
let questions = [];
let timerInterval;
const timeLimit = 30; // Time limit for each question in seconds

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

        // Check if questions is an array and not empty
        if (Array.isArray(questions) && questions.length > 0) {
          showQuestion(currentQuestionIndex);
        } else {
          alert('No questions found in the quiz!');
        }
      } else {
        alert('Quiz not found!');
      }
    })
    .catch((error) => {
      console.error("Error loading quiz: ", error);
    });
}

function showQuestion(index) {
  clearInterval(timerInterval);
  const questionData = questions[index];
  console.log('Question Data:', questionData); // Debugging

  if (questionData && questionData.options && typeof questionData.options === 'object') {
    // Convert options object to an array
    const optionsArray = Object.values(questionData.options);
    
    document.getElementById('questionText').innerText = questionData.question;
    const optionsContainer = document.getElementById('optionsContainer');
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

    startTimer();
  } else {
    console.error('Question options are not valid:', questionData.options); // Debugging
    alert('Invalid question format!');
  }
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
document.getElementById('prevButton').addEventListener('click', prevQuestion);
document.getElementById('nextButton').addEventListener('click', nextQuestion);
