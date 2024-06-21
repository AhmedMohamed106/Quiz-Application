

import {
    firestore,
    collection,
    getDocs,
    } from "../Src/FirebaseConfig.js"
    const searchInput = document.getElementById("search-input");
    const filterSelect = document.getElementById("filter-select");
    //const quizCards = document.querySelectorAll(".quiz-card");
    function fetchCategories() {
        const categoriesSet = new Set();
        try {
            const querySnapshot = getDocs(collection(firestore, 'quizzes'));
            querySnapshot.forEach((doc) => {
                const quiz = doc.data();
                if (quiz.category) {
                    categoriesSet.add(quiz.category);
                }
            });
        } catch (error) {
            console.error("Error fetching categories: ", error);
        }
        return Array.from(categoriesSet);
    }

     function populateCategoryDropdown() {
        const categories =  fetchCategories();
        filterSelect.innerHTML = '<option value="all">All Categories</option>';
        categories.forEach((category) => {
            const option = document.createElement("option");
            option.value = category.toLowerCase();
            option.textContent = category;
            filterSelect.appendChild(option);
        });
    }


    function filterQuizzes() {
        const searchText = searchInput.value.toLowerCase();
        const selectedCategory = filterSelect.value;
        const quizCards = document.querySelectorAll('.quiz-card');

        quizCards.forEach((quizCard) => {
            const cardCategory = quizCard.getAttribute('data-category');
            const title = quizCard.querySelector('.card-title').textContent.toLowerCase();
            const description = quizCard.querySelector('.card-description').textContent.toLowerCase();
            const matchesSearch = title.includes(searchText)|| description.includes(searchText);
            const matchesCategory = selectedCategory === "" || cardCategory === selectedCategory;

            if (matchesSearch && matchesCategory) {
                quizCard.style.display = "flex";
            } else {
                quizCard.style.display = "none";
            }
        });
    }
    function loadQuizzes() {
        const quizzesContainer = document.querySelector('.quiz-card');
        
        getDocs(collection(firestore, 'quizzes')).then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                const quiz = doc.data();
                const quizCard = document.createElement('div');
                quizCard.classList.add('col-md-3');
                quizCard.setAttribute('data-category', quiz.category.toLowerCase()); // Store category as lowercase
    
                quizCard.innerHTML = `
                    <div class="card" style="display:flex; flex-wrap:wrap;height:200px;width:250px">
                        <div class="card-body">
                            <h5 class="card-title">${quiz.title}</h5>
                            <p class="card-category">Category: ${quiz.category}</p>
                            <p class="card-description">${quiz.description}</p>
                            <a class="quiz-card-btn" href="Quiz interface.html?id=${doc.id}" class="btn btn-primary">Start Quiz</a>
                        </div>
                    </div>
                    
                `;
                quizzesContainer.appendChild(quizCard);
            });
            searchInput.addEventListener("input", filterQuizzes);
            filterSelect.addEventListener("change", filterQuizzes);
        }).catch((error) => {
            console.error("Error fetching quizzes: ", error);
        });
    }

    

document.addEventListener('DOMContentLoaded', function (){
    populateCategoryDropdown();

    loadQuizzes();

});
