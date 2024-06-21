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
    

