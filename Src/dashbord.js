

import {
    firestore,
    collection,
    getDocs,
    query,
    where,
    deleteDoc,
    doc
} from "../Src/FirebaseConfig.js";

document.addEventListener('DOMContentLoaded', async function () {
    let studentCount = 0; // Initialize student count
    let allQuizzes = []; // Store all quizzes for filtering

    try {
        // Fetch users
        let studentsQuery = query(collection(firestore, 'users'), where('role', '==', 'student'));
        let studentsSnapshot = await getDocs(studentsQuery);

        // Fetch quizzes
        let quizzesQuery = query(collection(firestore, 'quizzes'));
        let quizzesSnapshot = await getDocs(quizzesQuery);

        let quizCount = quizzesSnapshot.size; // Get the total number of quizzes

        // Display students
        let studentsTableBody = document.querySelector('#students-table tbody');
        studentsSnapshot.forEach(doc => {
            let studentData = doc.data();
            let studentRow = document.createElement('tr');

            // Fetch the number of quizzes taken
            let quizzesTaken = Array.isArray(studentData.quizzes) ? studentData.quizzes.length : 0;

            studentRow.innerHTML = `
                <td>${studentData.username}</td>
                <td>${studentData.email}</td>
                <td>${quizzesTaken}</td>
            `;
            studentsTableBody.appendChild(studentRow);
            studentCount++; // Increment student count
        });

        // Display quizzes and store in allQuizzes for filtering
        let quizzesTableBody = document.querySelector('#quizzes-table tbody');
        quizzesSnapshot.forEach(doc => {
            let quizData = doc.data();
            allQuizzes.push({ id: doc.id, ...quizData }); // Store document ID along with quiz data
            let quizRow = document.createElement('tr');

            quizRow.innerHTML = `
                <td>${allQuizzes.length}</td>
                <td>${quizData.title}</td>
                <td>${quizData.timeLimit} seconds</td>
                <td><button class="delete-btn" data-id="${doc.id}"><i class="fas fa-trash"></i></button></td>
            `;
            quizzesTableBody.appendChild(quizRow);
        });

        document.querySelector(".numbers").textContent = studentCount;
        document.getElementById("n-ofQuizes").textContent = quizCount;

        // Add search functionality
        let searchInput = document.getElementById('category-search');
        searchInput.addEventListener('input', () => {
            let category = searchInput.value.trim().toLowerCase();
            let filteredQuizzes = allQuizzes.filter(quiz =>
                quiz.title && quiz.title.toLowerCase().startsWith(category)
            );
            displayQuizzes(filteredQuizzes);
        });

        function displayQuizzes(quizzes) {
            quizzesTableBody.innerHTML = "";
            quizzes.forEach((quizData, index) => {
                let quizRow = document.createElement('tr');
                quizRow.innerHTML = `
                    <td>${index + 1}</td>
                    <td>${quizData.title}</td>
                    <td>${quizData.timeLimit} seconds</td>
                    <td><button class="delete-btn" data-id="${quizData.id}"><i class="fas fa-trash"></i></button></td>
                `;
                quizzesTableBody.appendChild(quizRow);
            });
        }

        addDeleteEventListeners();

        function addDeleteEventListeners() {
            const deleteButtons = document.querySelectorAll('.delete-btn');
            deleteButtons.forEach(button => {
                button.addEventListener('click', async (event) => {
                    const quizId = event.target.getAttribute('data-id');
                    console.log('Deleting quiz with ID:', quizId); // Log the quizId to check its value
                    try {
                        if (quizId) {
                            await deleteDoc(doc(firestore, 'quizzes', quizId));
                            // Remove the quiz from allQuizzes array
                            allQuizzes = allQuizzes.filter(quiz => quiz.id !== quizId);
                            displayQuizzes(allQuizzes); // Update displayed quizzes
                            quizCount--; // Update quiz count
                            document.getElementById("n-ofQuizes").textContent = quizCount;
                        } else {
                            console.error('Error deleting quiz: Invalid quizId');
                        }
                    } catch (error) {
                        console.error('Error deleting quiz: ', error);
                    }
                });
            });
        } 

    } catch (error) {
        console.error('Error fetching data: ', error);
    }

});

