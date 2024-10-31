const storedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    function updateTheme(isDark) {
        if (isDark) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }

    // Initial theme setup
    if (storedTheme) {
        updateTheme(storedTheme === 'dark');
    } else {
        updateTheme(systemPrefersDark);
    }

    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            updateTheme(e.matches);
        }
    });

    // Toggle theme function
    function toggleTheme() {
        const isDark = document.documentElement.classList.contains('dark');
        updateTheme(!isDark);
    }

    // Theme toggle button implementation
    const toggleButton = document.getElementById('theme-toggle');
    if (toggleButton) {
        toggleButton.addEventListener('click', toggleTheme);
    }
// Info button tooltip
function showInfo() {
    document.querySelector('.info-tooltip').style.display = 'block';
}

function hideInfo() {
    document.querySelector('.info-tooltip').style.display = 'none';
}
// Timer functionality
let timeLeft = 30 * 60; // 30 minutes in seconds
        const timerDisplay = document.querySelector('.timer');

        function updateTimer() {
            const minutes = Math.floor(timeLeft / 60);
            const seconds = timeLeft % 60;
            timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            
            if (timeLeft > 0) {
                timeLeft--;
            } else {
                clearInterval(timerInterval);
                alert('Time is up!');
            }
        }

        const timerInterval = setInterval(updateTimer, 1000);
        // Select the refresh icon
        const refreshIcon = document.querySelector('.bx-refresh');
        
        // Function to clear the selected options
        function refreshQuestion() {
            // Select all radio inputs within the question container and uncheck them
            document.querySelectorAll('.question-container .options input[type="radio"]').forEach(radio => {
                radio.checked = false;
            });
        }
        
        // Add click event listener to the refresh icon
        refreshIcon.addEventListener('click', refreshQuestion);


        const questions = [
            {
                text: "What is the value of π (pi) to two decimal places?",
                options: ["3.14", "3.12", "3.16", "3.18"],
                correctAnswer: 0 // Index of the correct answer in options array
            },
            {
                text: "What is the square root of 16?",
                options: ["2", "3", "4", "5"],
                correctAnswer: 2
            },
            {
                text: "What is 5 + 3?",
                options: ["5", "6", "8", "10"],
                correctAnswer: 2
            }
        ];
        
        // Track the current question index
        let currentQuestionIndex = 0;
        
        // Track answer status
        const questionNumbers = document.querySelectorAll('.question-number');
        
        // Initialize first question as current
        questionNumbers[0].classList.add('current');
        
        // Function to render the question based on the current index
        function renderQuestion(index) {
            const question = questions[index];
            const questionNumberElem = document.getElementById("question-number");
            const questionTextElem = document.getElementById("question-text");
            const optionsContainer = document.getElementById("options-container");
        
            // Update question number and text
            questionNumberElem.textContent = `Question ${index + 1}:`;
            questionTextElem.textContent = question.text;
        
            // Clear previous options
            optionsContainer.innerHTML = "";
        
            // Render new options with event listener for answer selection
            question.options.forEach((option, i) => {
                const optionElem = document.createElement("div");
                optionElem.className = "ans";
                optionElem.innerHTML = `<input type="radio" name="question${index}" value="${i}"> ${option}`;
                
                const radioInput = optionElem.querySelector('input[type="radio"]');
                radioInput.addEventListener('change', () => {
                    questionNumbers[currentQuestionIndex].classList.add('answered');
                    questionNumbers[currentQuestionIndex].classList.remove('visited');
                });
        
                optionsContainer.appendChild(optionElem);
            });
        }
        
        // Update current question status and navigate to specific question
        function updateCurrentQuestion(index) {
            if (!questionNumbers[currentQuestionIndex].classList.contains('answered')) {
                questionNumbers[currentQuestionIndex].classList.add('visited');
            }
            questionNumbers[currentQuestionIndex].classList.remove('current');
            questionNumbers[index].classList.add('current');
            questionNumbers[index].classList.remove('visited');
            currentQuestionIndex = index;
            renderQuestion(currentQuestionIndex);
        }
        
        // Initialize question navigation on click
        questionNumbers.forEach((number, index) => {
            number.addEventListener('click', () => {
                updateCurrentQuestion(index);
            });
        });
        
        // Initial render of the first question
        renderQuestion(currentQuestionIndex);
        
        // Navigation buttons for next and previous
        document.querySelector(".prev-btn").addEventListener("click", () => {
            if (currentQuestionIndex > 0) {
                updateCurrentQuestion(currentQuestionIndex - 1);
            }
        });
        
        document.querySelector(".next-btn").addEventListener("click", () => {
            if (currentQuestionIndex < questions.length - 1) {
                updateCurrentQuestion(currentQuestionIndex + 1);
            }
        });
        
        document.querySelector(".mark-btn").addEventListener("click", () => {
            questionNumbers[currentQuestionIndex].classList.toggle('marked');
        });

        function translateContent(language) {
            const questionText = document.getElementById("question-text");
            const options = document.querySelectorAll(".ans");
                      // Assuming you have a translation function using Googletrans
            const translatedQuestion = translateText(questionText.textContent, language);
            const translatedOptions = options.map(option => translateText(option.textContent, language));
            questionText.textContent = translatedQuestion;
            options.forEach((option, index) => {
            option.textContent = translatedOptions[index];
            });
        }
        
          // Event listener for language change
        document.querySelector(".language-select").addEventListener("change", (event) => {
            const selectedLanguage = event.target.value;
            translateContent(selectedLanguage);
        });

        // Submit Warning PopUp
        const bg = document.querySelector('.bg');
        const modal = document.querySelector('.submit-box');
        const submitBtn = document.getElementById('pop_up');
        const closeBtn = document.querySelector('.close');

        submitBtn.onclick = function() {
            modal.classList.add('show');
            bg.classList.add('modal-background');
        }
        closeBtn.onclick = function() {
            modal.classList.remove('show');
            bg.classList.remove('modal-background');
        }
        document.getElementById('confirm').addEventListener('click', () => {
            alert('Your paper submission was successful!');
            window.location.href = 'start.html';
        });
        //Language change
        function updateQuestionLanguage() {
            const languageSelect = document.querySelector('.language-select');
            const questionContainers = document.querySelectorAll('.question-container');
          
            questionContainers.forEach((container, index) => {
              const questionText = container.querySelector('#question-text');
              const optionElements = container.querySelectorAll('.options .ans input[type="radio"] + label');
          
              // Translate the question text
              translateText(questions[index].text, languageSelect.value)
                .then(translatedText => {
                  questionText.textContent = translatedText;
                });
          
              // Translate the options
              questions[index].options.forEach((option, optionIndex) => {
                translateText(option, languageSelect.value)
                  .then(translatedOption => {
                    optionElements[optionIndex].textContent = translatedOption;
                  });
              });
            });
          }
          
          function translateText(text, target) {
            return fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${target}&dt=t&q=${encodeURIComponent(text)}`)
              .then(response => response.json())
              .then(data => data[0][0][0]);
          }
          
          const languageSelect = document.querySelector('.language-select');
          languageSelect.addEventListener('change', updateQuestionLanguage);
