
import {
    firestore,
    collection,
    getDocs,
    } from "../Src/FirebaseConfig.js"
 function loadQuizzes() {
    const quizzesContainer = document.getElementById('quizzesContainer');
    
    getDocs(collection(firestore, 'quizzes')).then((querySnapshot) => {
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
                        <a href="QuizDetails.html?id=${doc.id}" class="btn btn-primary">Start Quiz</a>
                    </div>
                </div>
            `;
            quizzesContainer.appendChild(quizCard);
        });
    }).catch((error) => {
        console.error("Error fetching quizzes: ", error);
    });
}

document.addEventListener('DOMContentLoaded', loadQuizzes);
