/*
import {
    firestore,
    collection,
    getDocs, query , where} from "../Src/FirebaseConfig.js"
    document.addEventListener('DOMContentLoaded', async function() {
        let studentCount = 0; // Initialize student count
        try {
            // fetch users 
            const studentsQuery = query(collection(firestore, 'users'), where('role', '==', 'student'));
            const studentsSnapshot = await getDocs(studentsQuery);

            // fetch quizes

            const quizzesQuery = query(collection(firestore, 'quizzes'));
            const quizzesSnapshot = await getDocs(quizzesQuery);

            const quizCount = quizzesSnapshot.size; // Get the total number of quizzes

            
            const studentsTableBody = document.querySelector('#students-table tbody');
            const searchInput = document.getElementById('category-search');
    
            studentsSnapshot.forEach(doc => {
                const studentData = doc.data();
                const studentRow = document.createElement('tr');
                
                // Fetch the number of quizzes taken
                const quizzesTaken = Array.isArray(studentData.quizzes) ? studentData.quizzes.length : 0;
    
                studentRow.innerHTML = `
                    <td>${studentData.username}</td>
                    <td>${studentData.email}</td>
                    <td>${quizzesTaken}</td>
                `;
                studentsTableBody.appendChild(studentRow);
                studentCount++; // Increment student count
            });

            const quizzesTableBody = document.querySelector('#quizzes-table tbody');
            let quizIndex = 1; // Initialize quiz index

            quizzesSnapshot.forEach(doc => {
            const quizData = doc.data();
            const quizRow = document.createElement('tr');

            quizRow.innerHTML = `
                <td>${quizIndex++}</td>
                <td>${quizData.title}</td>
                <td>${(quizData.timeLimit)} seconds</td>
            `;
            quizzesTableBody.appendChild(quizRow);
        });
            document.querySelector(".numbers").textContent =  studentCount;
            document.getElementById("n-ofQuizes").textContent = quizCount;
        } catch (error) {
            console.error('Error fetching student data: ', error);
        }
    });
    
*/

/*
import {
    firestore,
    collection,
    getDocs, query, where
} from "../Src/FirebaseConfig.js";

document.addEventListener('DOMContentLoaded', async function () {
    let studentCount = 0; // Initialize student count
    let allQuizzes = []; // Store all quizzes for filtering

    try {
        // Fetch users
        const studentsQuery = query(collection(firestore, 'users'), where('role', '==', 'student'));
        const studentsSnapshot = await getDocs(studentsQuery);

        // Fetch quizzes
        const quizzesQuery = query(collection(firestore, 'quizzes'));
        const quizzesSnapshot = await getDocs(quizzesQuery);

        const quizCount = quizzesSnapshot.size; // Get the total number of quizzes

        // Display students
        const studentsTableBody = document.querySelector('#students-table tbody');
        studentsSnapshot.forEach(doc => {
            const studentData = doc.data();
            const studentRow = document.createElement('tr');

            // Fetch the number of quizzes taken
            const quizzesTaken = Array.isArray(studentData.quizzes) ? studentData.quizzes.length : 0;

            studentRow.innerHTML = `
                <td>${studentData.username}</td>
                <td>${studentData.email}</td>
                <td>${quizzesTaken}</td>
            `;
            studentsTableBody.appendChild(studentRow);
            studentCount++; // Increment student count
        });

        // Display quizzes and store in allQuizzes for filtering
        const quizzesTableBody = document.querySelector('#quizzes-table tbody');
        quizzesSnapshot.forEach(doc => {
            const quizData = doc.data();
            allQuizzes.push(quizData);
            const quizRow = document.createElement('tr');

            quizRow.innerHTML = `
                <td>${allQuizzes.length}</td>
                <td>${quizData.title}</td>
                <td>${quizData.timeLimit} seconds</td>
            `;
            quizzesTableBody.appendChild(quizRow);
        });

        document.querySelector(".numbers").textContent = studentCount;
        document.getElementById("n-ofQuizes").textContent = quizCount;

        // Add search functionality
        const searchInput = document.getElementById('category-search');
        searchInput.addEventListener('input', () => {
            const category = searchInput.value.trim().toLowerCase();
            const filteredQuizzes = allQuizzes.filter(quiz => quiz.category && quiz.category.toLowerCase().includes(category));
            displayQuizzes(filteredQuizzes);
        });

        function displayQuizzes(quizzes) {
            quizzesTableBody.innerHTML = "";
            quizzes.forEach((quizData, index) => {
                const quizRow = document.createElement('tr');
                quizRow.innerHTML = `
                    <td>${index + 1}</td>
                    <td>${quizData.title}</td>
                    <td>${quizData.timeLimit} seconds</td>
                `;
                quizzesTableBody.appendChild(quizRow);
            });
        }
    } catch (error) {
        console.error('Error fetching data: ', error);
    }
});





*/


import {
    firestore,
    collection,
    getDocs, query, where
} from "../Src/FirebaseConfig.js";

document.addEventListener('DOMContentLoaded', async function () {
    let studentCount = 0; // Initialize student count
    let allQuizzes = []; // Store all quizzes for filtering

    try {
        // Fetch users
        const studentsQuery = query(collection(firestore, 'users'), where('role', '==', 'student'));
        const studentsSnapshot = await getDocs(studentsQuery);

        // Fetch quizzes
        const quizzesQuery = query(collection(firestore, 'quizzes'));
        const quizzesSnapshot = await getDocs(quizzesQuery);

        const quizCount = quizzesSnapshot.size; // Get the total number of quizzes

        // Display students
        const studentsTableBody = document.querySelector('#students-table tbody');
        studentsSnapshot.forEach(doc => {
            const studentData = doc.data();
            const studentRow = document.createElement('tr');

            // Fetch the number of quizzes taken
            const quizzesTaken = Array.isArray(studentData.quizzes) ? studentData.quizzes.length : 0;

            studentRow.innerHTML = `
                <td>${studentData.username}</td>
                <td>${studentData.email}</td>
                <td>${quizzesTaken}</td>
            `;
            studentsTableBody.appendChild(studentRow);
            studentCount++; // Increment student count
        });

        // Display quizzes and store in allQuizzes for filtering
        const quizzesTableBody = document.querySelector('#quizzes-table tbody');
        quizzesSnapshot.forEach(doc => {
            const quizData = doc.data();
            allQuizzes.push(quizData);
            const quizRow = document.createElement('tr');

            quizRow.innerHTML = `
                <td>${allQuizzes.length}</td>
                <td>${quizData.title}</td>
                <td>${quizData.timeLimit} seconds</td>
            `;
            quizzesTableBody.appendChild(quizRow);
        });

        document.querySelector(".numbers").textContent = studentCount;
        document.getElementById("n-ofQuizes").textContent = quizCount;

        // Add search functionality
        const searchInput = document.getElementById('category-search');
        searchInput.addEventListener('input', () => {
            const category = searchInput.value.trim().toLowerCase();
            const filteredQuizzes = allQuizzes.filter(quiz => 
                quiz.title && quiz.title.toLowerCase().startsWith(category)
            );
            displayQuizzes(filteredQuizzes);
        });

        function displayQuizzes(quizzes) {
            quizzesTableBody.innerHTML = "";
            quizzes.forEach((quizData, index) => {
                const quizRow = document.createElement('tr');
                quizRow.innerHTML = `
                    <td>${index + 1}</td>
                    <td>${quizData.title}</td>
                    <td>${quizData.timeLimit} seconds</td>
                `;
                quizzesTableBody.appendChild(quizRow);
            });
        }
    } catch (error) {
        console.error('Error fetching data: ', error);
    }
});



