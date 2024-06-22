import { getFirestore, collection, addDoc, doc, setDoc , updateDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
 // Import the functions you need from the SDKs you need
 import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js"
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

const firestore = getFirestore();

document.getElementById('quizForm').addEventListener('submit', createQuiz);

function createQuiz(event) {
    event.preventDefault();
    
    const title = document.getElementById('title').value;
    const numQuestions = document.getElementById('numQuestions').value;
    const marks = document.getElementById('marks').value;
    const minusMarks = document.getElementById('minusMarks').value;
    const timeLimit = document.getElementById('timeLimit').value;
    const category = document.getElementById('category').value;
    const description = document.getElementById('description').value;
    
    const quizData = {
        title,
        numQuestions,
        marks,
        minusMarks,
        timeLimit,
        category,
        description
    };

    addDoc(collection(firestore, 'quizzes'), quizData)
        .then((docRef) => {
            console.log("Quiz Document written with ID: ", docRef.id);
            localStorage.setItem('currentQuizId', docRef.id);
            generateQuestionForms(numQuestions);
        })
        .catch((error) => {
            console.error("Error adding document: ", error);
        });
}

function generateQuestionForms(numQuestions) {
    document.getElementById('quizForm').classList.add('hidden');
    document.getElementById('questionForms').classList.remove('hidden');
    
    const questionsContainer = document.getElementById('questionsContainer');
    questionsContainer.innerHTML = '';

    for (let i = 0; i < numQuestions; i++) {
        const questionForm = document.createElement('div');
        questionForm.innerHTML = `
            <div class="card-header bg-primary text-white">
                <h5 class="mb-0">Question ${i + 1}</h5>
            </div>
            <div class="card-body">
                <div class="form-group">
                    <label for="question${i}">Question:</label>
                    <textarea class="form-control" id="question${i}" name="question${i}" rows="3" required></textarea>
                </div>
                <div class="form-group">
                    <label for="optionA${i}">Option A:</label>
                    <input type="text" class="form-control" id="optionA${i}" name="optionA${i}" required>
                </div>
                <div class="form-group">
                    <label for="optionB${i}">Option B:</label>
                    <input type="text" class="form-control" id="optionB${i}" name="optionB${i}" required>
                </div>
                <div class="form-group">
                    <label for="optionC${i}">Option C:</label>
                    <input type="text" class="form-control" id="optionC${i}" name="optionC${i}" required>
                </div>
                <div class="form-group">
                    <label for="optionD${i}">Option D:</label>
                    <input type="text" class="form-control" id="optionD${i}" name="optionD${i}" required>
                </div>
                <div class="form-group">
                    <label for="correctAnswer${i}">Correct Answer:</label>
                    <select class="form-control" id="correctAnswer${i}" name="correctAnswer${i}">
                        <option value="A">A</option>
                        <option value="B">B</option>
                        <option value="C">C</option>
                        <option value="D">D</option>
                    </select>
                </div>
            </div>
        `;
        questionsContainer.appendChild(questionForm);
    }
    
    document.getElementById('submitQuestions').addEventListener('click', submitQuestions);
}

function submitQuestions() {
    const currentQuizId = localStorage.getItem('currentQuizId');
    const questionsContainer = document.getElementById('questionsContainer');
    const questions = [];

    for (let i = 0; i < questionsContainer.children.length; i++) {
        const questionForm = questionsContainer.children[i];
        const question = document.getElementById(`question${i}`).value;
        const optionA = document.getElementById(`optionA${i}`).value;
        const optionB = document.getElementById(`optionB${i}`).value;
        const optionC = document.getElementById(`optionC${i}`).value;
        const optionD = document.getElementById(`optionD${i}`).value;
        const correctAnswer = document.getElementById(`correctAnswer${i}`).value;

        questions.push({
            question,
            options: { A: optionA, B: optionB, C: optionC, D: optionD },
            correctAnswer
        });
    }

    setDoc(doc(firestore, 'quizzes', currentQuizId), { questions }, { merge: true })
        .then(() => {
            console.log("Questions successfully written!");
            alert("Quiz created successfully!");
        })
        .catch((error) => {
            console.error("Error writing document: ", error);
        });
}





  