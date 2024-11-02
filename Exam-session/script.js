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

function formatTime(timeInSeconds) {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function updateTimer() {
    timerDisplay.textContent = formatTime(timeLeft);
    
    if (timeLeft > 0) {
        timeLeft--;
    } else {
        clearInterval(timerInterval);
        alert('Time is up!');
        window.location.href = 'start.html';
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
            },
            {
                text: "What is the square root of 16?",
                options: ["2", "3", "4", "5"],
                correctAnswer: 2
              },
              {
                text: "What is 7 × 8?",
                options: ["54", "56", "58", "60"],
                correctAnswer: 1
              },
              {
                text: "What is 125 ÷ 5?",
                options: ["20", "25", "30", "35"],
                correctAnswer: 1
              },
              {
                text: "What is 15% of 200?",
                options: ["20", "25", "30", "35"],
                correctAnswer: 2
              },
              {
                text: "What is the cube of 3?",
                options: ["6", "9", "18", "27"],
                correctAnswer: 3
              },
              {
                text: "What is -8 + 3?",
                options: ["-11", "-5", "-3", "-1"],
                correctAnswer: 1
              },
              {
                text: "What is 2³?",
                options: ["6", "8", "10", "12"],
                correctAnswer: 1
              },
              {
                text: "What is the perimeter of a square with side length 5?",
                options: ["15", "20", "25", "30"],
                correctAnswer: 1
              },
              {
                text: "What is 3/4 as a decimal?",
                options: ["0.65", "0.70", "0.75", "0.80"],
                correctAnswer: 2
              },
              {
                text: "What is the area of a rectangle with length 6 and width 4?",
                options: ["10", "14", "24", "30"],
                correctAnswer: 2
              },
              {
                text: "What is 42 - 17?",
                options: ["15", "20", "25", "35"],
                correctAnswer: 2
              },
              {
                text: "What is the next number in the sequence: 2, 4, 8, 16, ...?",
                options: ["24", "28", "30", "32"],
                correctAnswer: 3
              },
              {
                text: "What is 1/2 + 1/4?",
                options: ["2/6", "3/4", "4/6", "5/8"],
                correctAnswer: 1
              },
              {
                text: "What is the value of x in: x + 5 = 12?",
                options: ["5", "7", "8", "9"],
                correctAnswer: 1
              },
              {
                text: "What is 20% of 150?",
                options: ["25", "30", "35", "30"],
                correctAnswer: 1
              },
              {
                text: "What is the area of a triangle with base 8 and height 6?",
                options: ["21", "24", "27", "30"],
                correctAnswer: 1
              },
              {
                "text": "What is 9 × 7?",
                "options": ["56", "63", "72", "81"],
                "correctAnswer": 1
              },
              {
                "text": "What is 144 ÷ 12?",
                "options": ["10", "12", "14", "16"],
                "correctAnswer": 1
              },
              {
                "text": "What is the square of 9?",
                "options": ["72", "81", "90", "99"],
                "correctAnswer": 1
              },
              {
                "text": "What is 5⁴?",
                "options": ["525", "600", "625", "650"],
                "correctAnswer": 2
              },
              {
                "text": "What is the sum of angles in a triangle?",
                "options": ["90°", "120°", "180°", "360°"],
                "correctAnswer": 2
              },
              {
                "text": "What is 25% of 80?",
                "options": ["15", "20", "25", "30"],
                "correctAnswer": 1
              },
              {
                "text": "What is the value of π rounded to 2 decimal places?",
                "options": ["3.12", "3.14", "3.16", "3.18"],
                "correctAnswer": 1
              },
              {
                "text": "What is 2/5 as a decimal?",
                "options": ["0.2", "0.3", "0.4", "0.5"],
                "correctAnswer": 2
              },
              {
                "text": "What is the next prime number after 17?",
                "options": ["18", "19", "20", "21"],
                "correctAnswer": 1
              },
              {
                "text": "What is 6! (6 factorial)?",
                "options": ["120", "360", "720", "5040"],
                "correctAnswer": 2
              },
              {
                "text": "What is the square root of 81?",
                "options": ["7", "8", "9", "10"],
                "correctAnswer": 2
              },
              {
                "text": "What is 3.5 × 2?",
                "options": ["6.0", "6.5", "7.0", "7.5"],
                "correctAnswer": 2
              },
              {
                "text": "What is the area of a circle with radius 5? (Use π = 3.14)",
                "options": ["31.4", "47.1", "78.5", "125.6"],
                "correctAnswer": 2
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
        // Logout Warning PopUp
const logout = document.querySelector('.bg-logout');
const container = document.querySelector('.logout-box');
const logoutBtn = document.getElementById('logout-pop_up');
const cancleBtn = document.querySelector('.cancle');

logoutBtn.onclick = function() {
    container.classList.add('show');
    logout.classList.add('logout-background');
}
cancleBtn.onclick = function() {
    container.classList.remove('show');
    logout.classList.remove('logout-background');
}
document.getElementById('logout').addEventListener('click', () => {
    alert('Your logout was successful!');
    window.location.href = 'start.html';
});
        // Language change
        // function updateQuestionLanguage() {
        //     const languageSelect = document.querySelector('.language-select');
        //     const questionContainers = document.querySelectorAll('.question-container');
        
        //     questionContainers.forEach((container, index) => {
        //     const questionText = container.querySelector('#question-text');
        //     const optionElements = container.querySelectorAll('.options .ans input[type="radio"] + label');
        //       // Translate the question text
        //     translateText(questions[index].text, languageSelect.value)
        //         .then(translatedText => {
        //         questionText.textContent = translatedText;
        //         });
        //       // Translate the options
        //     questions[index].options.forEach((option, optionIndex) => {
        //         translateText(option, languageSelect.value)
        //         .then(translatedOption => {
        //             optionElements[optionIndex].textContent = translatedOption;
        //         });
        //     });
        //     });
        // }
        
        // function translateText(text, target) {
        //     return fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${target}&dt=t&q=${encodeURIComponent(text)}`)
        //     .then(response => response.json())
        //     .then(data => data[0][0][0]);
        // }
        
        // const languageSelect = document.querySelector('.language-select');
        // languageSelect.addEventListener('change', updateQuestionLanguage);


         // Assuming questionstranslate array has this structure:
const questionstranslate = [
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
    },
    {
        text: "What is the square root of 16?",
        options: ["2", "3", "4", "5"],
        correctAnswer: 2
      },
      {
        text: "What is 7 × 8?",
        options: ["54", "56", "58", "60"],
        correctAnswer: 1
      },
      {
        text: "What is 125 ÷ 5?",
        options: ["20", "25", "30", "35"],
        correctAnswer: 1
      },
      {
        text: "What is 15% of 200?",
        options: ["20", "25", "30", "35"],
        correctAnswer: 2
      },
      {
        text: "What is the cube of 3?",
        options: ["6", "9", "18", "27"],
        correctAnswer: 3
      },
      {
        text: "What is -8 + 3?",
        options: ["-11", "-5", "-3", "-1"],
        correctAnswer: 1
      },
      {
        text: "What is 2³?",
        options: ["6", "8", "10", "12"],
        correctAnswer: 1
      },
      {
        text: "What is the perimeter of a square with side length 5?",
        options: ["15", "20", "25", "30"],
        correctAnswer: 1
      },
      {
        text: "What is 3/4 as a decimal?",
        options: ["0.65", "0.70", "0.75", "0.80"],
        correctAnswer: 2
      },
      {
        text: "What is the area of a rectangle with length 6 and width 4?",
        options: ["10", "14", "24", "30"],
        correctAnswer: 2
      },
      {
        text: "What is 42 - 17?",
        options: ["15", "20", "25", "35"],
        correctAnswer: 2
      },
      {
        text: "What is the next number in the sequence: 2, 4, 8, 16, ...?",
        options: ["24", "28", "30", "32"],
        correctAnswer: 3
      },
      {
        text: "What is 1/2 + 1/4?",
        options: ["2/6", "3/4", "4/6", "5/8"],
        correctAnswer: 1
      },
      {
        text: "What is the value of x in: x + 5 = 12?",
        options: ["5", "7", "8", "9"],
        correctAnswer: 1
      },
      {
        text: "What is 20% of 150?",
        options: ["25", "30", "35", "30"],
        correctAnswer: 1
      },
      {
        text: "What is the area of a triangle with base 8 and height 6?",
        options: ["21", "24", "27", "30"],
        correctAnswer: 1
      },
      {
        "text": "What is 9 × 7?",
        "options": ["56", "63", "72", "81"],
        "correctAnswer": 1
      },
      {
        "text": "What is 144 ÷ 12?",
        "options": ["10", "12", "14", "16"],
        "correctAnswer": 1
      },
      {
        "text": "What is the square of 9?",
        "options": ["72", "81", "90", "99"],
        "correctAnswer": 1
      },
      {
        "text": "What is 5⁴?",
        "options": ["525", "600", "625", "650"],
        "correctAnswer": 2
      },
      {
        "text": "What is the sum of angles in a triangle?",
        "options": ["90°", "120°", "180°", "360°"],
        "correctAnswer": 2
      },
      {
        "text": "What is 25% of 80?",
        "options": ["15", "20", "25", "30"],
        "correctAnswer": 1
      },
      {
        "text": "What is the value of π rounded to 2 decimal places?",
        "options": ["3.12", "3.14", "3.16", "3.18"],
        "correctAnswer": 1
      },
      {
        "text": "What is 2/5 as a decimal?",
        "options": ["0.2", "0.3", "0.4", "0.5"],
        "correctAnswer": 2
      },
      {
        "text": "What is the next prime number after 17?",
        "options": ["18", "19", "20", "21"],
        "correctAnswer": 1
      },
      {
        "text": "What is 6! (6 factorial)?",
        "options": ["120", "360", "720", "5040"],
        "correctAnswer": 2
      },
      {
        "text": "What is the square root of 81?",
        "options": ["7", "8", "9", "10"],
        "correctAnswer": 2
      },
      {
        "text": "What is 3.5 × 2?",
        "options": ["6.0", "6.5", "7.0", "7.5"],
        "correctAnswer": 2
      },
      {
        "text": "What is the area of a circle with radius 5? (Use π = 3.14)",
        "options": ["31.4", "47.1", "78.5", "125.6"],
        "correctAnswer": 2
      }
    // ... more questionstranslate
];

async function updateQuestionLanguage() {
    const languageSelect = document.querySelector('.language-select');
    const questionContainers = document.querySelectorAll('.question-container');
    const targetLanguage = languageSelect.value;

    try {
        // Process all questionstranslate in parallel
        const translationPromises = Array.from(questionContainers).map(async (container, index) => {
            const questionText = container.querySelector('#question-text');
            const optionElements = container.querySelectorAll('.options .ans input[type="radio"] + label');

            // Translate question text
            const translatedQuestionText = await translateText(questionstranslate[index].text, targetLanguage);
            questionText.textContent = translatedQuestionText;

            // Translate all options for this question in parallel
            const optionPromises = Array.from(optionElements).map(async (element, optionIndex) => {
                const translatedOption = await translateText(questionstranslate[index].options[optionIndex], targetLanguage);
                element.textContent = translatedOption;
            });

            await Promise.all(optionPromises);
        });

        // Wait for all questionstranslate to be translated
        await Promise.all(translationPromises);
        
    } catch (error) {
        console.error('Translation error:', error);
    }
}

async function translateText(text, target) {
    try {
        const response = await fetch(
            `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${target}&dt=t&q=${encodeURIComponent(text)}`
        );
        const data = await response.json();
        return data[0][0][0];
    } catch (error) {
        console.error('Error translating text:', error);
        return text; // Return original text if translation fails
    }
}

// Add event listener
const languageSelect = document.querySelector('.language-select');
languageSelect.addEventListener('change', updateQuestionLanguage);

// Optional: Initial translation when page loads
document.addEventListener('DOMContentLoaded', updateQuestionLanguage);


// ChatBot

let isOpen = true;

    function toggleChat() {
        const chatBody = document.querySelector('.chat-body');
        isOpen = !isOpen;
        chatBody.style.display = isOpen ? 'flex' : 'none';
    }

    // Initialize chat with welcome message
    window.onload = function() {
        addMessage("Hi! I'm your exam assistant. How can I help you today?", 'bot');
        addMessage("You can ask me about exam duration, marking scheme, or language options.", 'bot');
    }

    function addMessage(text, sender) {
        const messagesDiv = document.getElementById('chatMessages');
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;
        messageDiv.textContent = text;
        messagesDiv.appendChild(messageDiv);
        messagesDiv.scrollTop = messagesDiv.scrollHeight;
    }

    function sendMessage() {
        const input = document.getElementById('chating');
        const message = input.value.trim();
        
        if (message) {
            addMessage(message, 'user');
            generateResponse(message);
            input.value = '';
        }
    }

    // Handle Enter key
    document.getElementById('chating').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    function askQuestion(topic) {
        addMessage(topic, 'user');
        generateResponse(topic);
    }

    function generateResponse(query) {
        setTimeout(() => {
            const response = getResponseForQuery(query.toLowerCase());
            addMessage(response, 'bot');
        }, 500);
    }

    function getResponseForQuery(query) {
      if (query.includes('time') || query.includes('duration')) {
        return `Your remaining time is ${formatTime(timeLeft)} minutes. The timer is displayed at the top of your screen.`;
      }
        if (query.includes('mark') || query.includes('marks')) {
            return 'Each question carries 2 marks. There is negative marking in this exam. Total marks of exam is 100.';
        }
        if (query.includes('language')) {
            return 'You can switch between English, Bengali, and Hindi using the language dropdown at the top.';
        }
        if (query.includes('review')) {
            return 'Use the "Mark for Review" button below the question. Reviewed questions appear in red in the question palette.';
        }
        if (query.includes('next') || query.includes('previous')) {
            return 'Use the Next and Previous buttons below the question, or click question numbers in the palette on the right.';
        }
        if (query.includes('submit')) {
            return 'Click the "Submit Exam" button at the bottom right when you\'re ready to submit. Make sure to review all questions first.';
        }
        return "I can help you with questions about time remaining, marking scheme, language options, or navigation. What would you like to know?";
    }