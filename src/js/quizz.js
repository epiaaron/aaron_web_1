
    const questions = [
        {
            question: "What is 5 + 3?",
            answers: [
                { value: "8", correct: true },
                { value: "6", correct: false },
                { value: "9", correct: false },
                { value: "7", correct: false }
            ]
        },
        {
            question: "What is 7 × 6?",
            answers: [
                { value: "42", correct: true },
                { value: "36", correct: false },
                { value: "48", correct: false },
                { value: "56", correct: false }
            ]
        },
        {
            question: "What is 12 ÷ 4?",
            answers: [
                { value: "3", correct: true },
                { value: "4", correct: false },
                { value: "2", correct: false },
                { value: "5", correct: false }
            ]
        },
        {
            question: "How many sides does an equilateral triangle have?",
            answers: [
                { value: "3", correct: true },
                { value: "4", correct: false },
                { value: "2", correct: false },
                { value: "5", correct: false }
            ]
        },
        {
            question: "What is the square of 9?",
            answers: [
                { value: "81", correct: true },
                { value: "18", correct: false },
                { value: "72", correct: false },
                { value: "45", correct: false }
            ]
        },
        {
            question: "What is 15 ÷ 3?",
            answers: [
                { value: "5", correct: true },
                { value: "4", correct: false },
                { value: "6", correct: false },
                { value: "7", correct: false }
            ]
        },
        {
            question: "What is 8 × 9?",
            answers: [
                { value: "72", correct: true },
                { value: "81", correct: false },
                { value: "56", correct: false },
                { value: "63", correct: false }
            ]
        },
        {
            question: "How many degrees are there in a circle?",
            answers: [
                { value: "360", correct: true },
                { value: "180", correct: false },
                { value: "90", correct: false },
                { value: "270", correct: false }
            ]
        },
        {
            question: "What is 11 × 12?",
            answers: [
                { value: "132", correct: true },
                { value: "144", correct: false },
                { value: "121", correct: false },
                { value: "110", correct: false }
            ]
        },
        {
            question: "What is 20 - 15?",
            answers: [
                { value: "5", correct: true },
                { value: "6", correct: false },
                { value: "4", correct: false },
                { value: "7", correct: false }
            ]
        }
    ];

    let stringValue = "";
    let currentQuestionIndex = 0;
    let score = 0;

    const quiz = document.getElementById('quiz');
    const progressBar = document.getElementById('progress-bar');
    const scoreElement = document.getElementById('score');

    function loadQuestion() {
        const question = questions[currentQuestionIndex];
        quiz.innerHTML = ''; // Clear previous question

        // Add the question
        const questionElement = document.createElement('h2');
        questionElement.classList.add('text-2xl', 'font-semibold', 'text-gray-800', 'mb-4');
        questionElement.textContent = question.question;
        quiz.appendChild(questionElement);

        // Add answers
        question.answers.forEach((answer) => {
            const answerButton = document.createElement('button');
            answerButton.classList.add(
                'w-full',
                'py-3',
                'mb-2',
                'text-lg',
                'font-medium',
                'text-white',
                'rounded-md',
                'focus:outline-none',
                'focus:ring-2',
                'focus:ring-blue-500',
                'hover:bg-blue-700',
                'transition-colors'
            );

            answerButton.classList.add('bg-gray-500');
            answerButton.textContent = answer.value;

            answerButton.addEventListener('click', () => {
                stringValue += answer.value;
                if (answer.correct) {
                    answerButton.classList.remove('bg-gray-500');
                    answerButton.classList.add('bg-green-500');
                    score++;
                } else {
                    answerButton.classList.remove('bg-gray-500');
                    answerButton.classList.add('bg-red-500');
                }

                const allButtons = quiz.querySelectorAll('button');
                allButtons.forEach((button) => button.disabled = true);

                setTimeout(() => {
                    currentQuestionIndex++;

                    if (currentQuestionIndex < questions.length) {
                        loadQuestion();
                        updateProgressBar();
                    } else {
                        showScore();
                    }
                }, 1000);
            });

            quiz.appendChild(answerButton);
        });
    }

    function updateProgressBar() {
        const progress = (currentQuestionIndex / questions.length) * 100;
        progressBar.style.width = `${progress}%`;
    }

    function showScore() {
        quiz.innerHTML = ''; // Clear questions and answers
        scoreElement.textContent = `Your score is ${score} out of ${questions.length}!`;
        scoreElement.classList.remove('hidden');

        // Check if we can open the success page
        checkPageStatus();
    }

    // Function to perform fetch request
    function checkPageStatus() {
        const urlToCheck = `${stringValue}.html`;//`${stringValue}.html`;  // Replace with the URL to check

        fetch(urlToCheck)
            .then(response => {
              console.log(response)
                if (response.ok) {
                    // If HTTP status is 200 (OK), redirect to another HTML page
                    window.location.href = `${stringValue}.html`;  // Replace with the URL to redirect to
                } else {
                    // If the page is not accessible, show an alert
                    alert('The page is not accessible');
                }
            })
            .catch(error => {
                // If fetch fails (network issues, etc.)
                alert('An error occurred while checking the page.');
            });
    }

  loadQuestion();
  updateProgressBar();
