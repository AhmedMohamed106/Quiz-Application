document.addEventListener("DOMContentLoaded", function() {
    const questions = [
        {
            title: "Question 1",
            text: "This is the text for question 1.",
            options: ["True", "False"],
            correctAnswer: 1
        },
        {
            title: "Question 2",
            text: "This is the text for question 2.",
            options: ["A) Cat", "B) Dog", "C) Cow", "D) Fish"],
            correctAnswer: 3
        },
        {
            title: "Question 3",
            text: "This is the text for question 3.",
            options: ["Choice 1", "Choice 2", "Choice 3"],
            correctAnswer: 0
        }
    ];

    let currentQuestionIndex = 0;
    const selectedAnswers = new Array(questions.length).fill(null);
    const isCorrect = new Array(questions.length).fill(null);

    const questionTitle = document.getElementById("question-title");
    const questionText = document.getElementById("question-text");
    const optionsContainer = document.querySelector(".options-container");
    const prevBtn = document.getElementById("prev-btn");
    const nextBtn = document.getElementById("next-btn");
    const submitBtn = document.getElementById("submit-btn");
    const timerElement = document.getElementById("timer");
    const resultsContainer = document.getElementById("results-container");
    const correctAnswersElement = document.getElementById("correct-answers");
    const incorrectAnswersElement = document.getElementById("incorrect-answers");
    const totalScoreElement = document.getElementById("total-score");

    let quizDuration = questions.length * 1 * 60; // 5 minutes in seconds
    let timerInterval;

    function startTimer() {
        timerInterval = setInterval(function() {
            if (quizDuration <= 0) {
                clearInterval(timerInterval);
                calculateScore();
            } else {
                quizDuration--;
                updateTimerDisplay();
            }
        }, 1000);
    }

    function updateTimerDisplay() {
        const minutes = Math.floor(quizDuration / 60);
        const seconds = quizDuration % 60;
        timerElement.textContent = `Remaining Time: ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }

    function loadQuestion(index) {
        const question = questions[index];
        questionTitle.textContent = question.title;
        questionText.textContent = question.text;
        optionsContainer.innerHTML = "";
        selectedOptionIndex = null;

        question.options.forEach((option, optionIndex) => {
            const optionBtn = document.createElement("button");
            optionBtn.className = "option";
            optionBtn.textContent = option;
            optionBtn.addEventListener("click", function() {
                selectOption(optionIndex);
            });
            if (selectedAnswers[index] === optionIndex) {
                optionBtn.classList.add("selected");
            }
            optionsContainer.appendChild(optionBtn);
        });
    }

    function selectOption(index) {
        selectedAnswers[currentQuestionIndex] = index;
        isCorrect[currentQuestionIndex] = index === questions[currentQuestionIndex].correctAnswer;
        const optionButtons = optionsContainer.querySelectorAll(".option");
        optionButtons.forEach((btn, btnIndex) => {
            btn.classList.remove("selected");
            if (btnIndex === index) {
                btn.classList.add("selected");
            }
        });
    }

    function calculateScore() {
        let correctCount = 0;
        let incorrectCount = 0;

        isCorrect.forEach(correct => {
            if (correct) {
                correctCount++;
            } else {
                incorrectCount++;
            }
        });

        correctAnswersElement.textContent = `Correct Answers: ${correctCount}`;
        incorrectAnswersElement.textContent = `Incorrect Answers: ${incorrectCount}`;
        totalScoreElement.textContent = `Total Score: ${correctCount} out of ${questions.length}`;

        document.querySelector('.quiz-container').style.display = 'none';
        timerElement.style.display = 'none'
        document.getElementById('home').style.display = 'block'
        resultsContainer.style.display = 'block';
    }

    function updateNavigationButtons() {
        prevBtn.disabled = currentQuestionIndex === 0;
        nextBtn.disabled = currentQuestionIndex === questions.length - 1;
    }

    prevBtn.addEventListener("click", function() {
        if (currentQuestionIndex > 0) {
            currentQuestionIndex--;
            loadQuestion(currentQuestionIndex);
            updateNavigationButtons();
        }
    });

    nextBtn.addEventListener("click", function() {
        if (currentQuestionIndex < questions.length - 1) {
            currentQuestionIndex++;
            loadQuestion(currentQuestionIndex);
            updateNavigationButtons();
        }
    });

    submitBtn.addEventListener("click", function() {
        clearInterval(timerInterval);
        calculateScore();
    });

    loadQuestion(currentQuestionIndex);
    updateNavigationButtons();
    updateTimerDisplay();
    startTimer();
});
