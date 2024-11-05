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
        window.location.href = 'postloading.html';
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
            window.location.href = 'logoutloading.html';
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
    window.location.href = 'postloading.html';
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
// Question tracking state
const examState = {
  totalQuestions: 25,
  currentQuestion: 1,
  questions: {},
  stats: {
      attempted: 0,
      notAttempted: 25,
      markedForReview: 0
  }
};

// Initialize question states
function initializeExam() {
  for (let i = 1; i <= examState.totalQuestions; i++) {
      examState.questions[i] = {
          status: 'notAttempted',
          selectedOption: null,
          isMarkedForReview: false
      };
  }
  updateQuestionMap();
  updateStatistics();
}
// Handle answer selection
function handleAnswerSelect(questionNumber, optionIndex) {
  const question = examState.questions[questionNumber];
  
  // If this question wasn't previously attempted
  if (question.status !== 'attempted') {
      examState.stats.attempted++;
      examState.stats.notAttempted--;
  }
  
  // Update question state
  question.status = 'attempted';
  question.selectedOption = optionIndex;
  
  // If it was marked for review, unmark it
  if (question.isMarkedForReview) {
      question.isMarkedForReview = false;
      examState.stats.markedForReview--;
  }
  
  updateQuestionMap();
  updateStatistics();
}

// Add these variables at the top of your script.js
const examConfig = {
  totalQuestions: questions.length,
  maxAttempts: 3,
  currentAttempt: 1,
  timePerAttempt: 30 * 60, // 30 minutes in seconds
};

// Update the info tooltip HTML content dynamically
function updateInfoTooltip() {
  const attemptsRemaining = examConfig.maxAttempts - examConfig.currentAttempt + 1;
  const answeredQuestions = document.querySelectorAll('.question-number.answered').length;
  const markedQuestions = document.querySelectorAll('.question-number.marked').length;
  
  const tooltipContent = `
      <div class="info-content">
          <p><strong>Total Questions:</strong> ${examConfig.totalQuestions}</p>
          <p><strong>Answered:</strong> ${answeredQuestions}</p>
          <p><strong>Marked for Review:</strong> ${markedQuestions}</p>
          <p><strong>Attempts Remaining:</strong> ${attemptsRemaining}</p>
          <p><strong>Current Attempt:</strong> ${examConfig.currentAttempt} of ${examConfig.maxAttempts}</p>
      </div>
  `;
  
  document.querySelector('.info-tooltip').innerHTML = tooltipContent;
}

// Modify the existing showInfo function
function showInfo() {
  updateInfoTooltip(); // Update content before showing
  document.querySelector('.info-tooltip').style.display = 'block';
}

// Update the timer display to include attempt information
function updateTimer() {
  const timerDisplay = document.querySelector('.timer');
  timerDisplay.textContent = formatTime(timeLeft);
  
  if (timeLeft > 0) {
      timeLeft--;
  } else {
      clearInterval(timerInterval);
      if (examConfig.currentAttempt < examConfig.maxAttempts) {
          examConfig.currentAttempt++;
          timeLeft = examConfig.timePerAttempt;
          resetExam();
      } else {
          alert('All attempts completed! Redirecting to start page.');
          window.location.href = 'postloading.html';
      }
  }
}

// Add function to reset exam state between attempts
function resetExam() {
  // Clear all answers
  document.querySelectorAll('.question-container .options input[type="radio"]').forEach(radio => {
      radio.checked = false;
  });
  
  // Reset question status indicators
  document.querySelectorAll('.question-number').forEach(num => {
      num.classList.remove('answered', 'marked', 'visited');
  });
  
  // Reset to first question
  currentQuestionIndex = 0;
  renderQuestion(currentQuestionIndex);
  
  // Update attempt information
  alert(`Starting attempt ${examConfig.currentAttempt} of ${examConfig.maxAttempts}`);
}

// Update submit button handler
document.getElementById('confirm').addEventListener('click', () => {
  const attemptsRemaining = examConfig.maxAttempts - examConfig.currentAttempt;
  if (attemptsRemaining > 0) {
      examConfig.currentAttempt++;
      timeLeft = examConfig.timePerAttempt;
      resetExam();
  } else {
      alert('Final attempt completed! Redirecting to start page.');
      window.location.href = 'postloading.html';
  }
});

// Add these event listeners to update info when questions are answered or marked
document.addEventListener('change', (e) => {
  if (e.target.type === 'radio') {
      updateInfoTooltip();
  }
});

document.querySelector('.mark-btn').addEventListener('click', () => {
  updateInfoTooltip();
});



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

function addMessage(text, sender, isViolation = false) {
  const messagesDiv = document.getElementById('chatMessages');
  const messageDiv = document.createElement('div');
  messageDiv.className = `message ${sender}-message${isViolation ? ' violation' : ''}`;
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



// Violation tracking state
const violationSystem = {
  violations: [],
  warningCount: 0,
  maxWarnings: 100,
  isFullscreen: false
};

// Initialize violation detection
function initializeViolationDetection() {
  // Detect tab visibility changes
  document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
          handleViolation('Tab Change', 'Warning: Changing tabs is not allowed during the exam.');
      }
  });

  // Detect browser back/forward buttons
  window.addEventListener('popstate', (e) => {
      e.preventDefault();
      handleViolation('Navigation', 'Warning: Using browser navigation buttons is not allowed.');
      window.history.pushState(null, null, window.location.href);
  });

  // Prevent right-click context menu
  document.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      handleViolation('Right Click', 'Warning: Right-clicking is disabled during the exam.');
  });

  // Detect copy/paste attempts
  document.addEventListener('copy', (e) => {
      e.preventDefault();
      handleViolation('Copy Attempt', 'Warning: Copying exam content is not allowed.');
  });
  
  document.addEventListener('paste', (e) => {
      e.preventDefault();
      handleViolation('Paste Attempt', 'Warning: Pasting content is not allowed during the exam.');
  });

  // Detect keyboard shortcuts
  document.addEventListener('keydown', (e) => {
      // Detect Ctrl/Cmd + key combinations
      if (e.ctrlKey || e.metaKey) {
          const blockedKeys = ['c', 'v', 'p', 'r', 'a'];
          if (blockedKeys.includes(e.key.toLowerCase())) {
              e.preventDefault();
              handleViolation('Keyboard Shortcut', 'Warning: Keyboard shortcuts are disabled during the exam.');
          }
      }
      
      // Detect Alt+Tab attempt
      if (e.altKey && e.key === 'Tab') {
          e.preventDefault();
          handleViolation('Alt+Tab', 'Warning: Switching applications is not allowed during the exam.');
      }
  });

  // Track mouse leaving the window
  document.addEventListener('mouseleave', () => {
      handleViolation('Mouse Leave', 'Warning: Please keep your mouse within the exam window.');
  });

  // Detect fullscreen changes
  document.addEventListener('fullscreenchange', () => {
      if (!document.fullscreenElement) {
          handleViolation('Fullscreen Exit', 'Warning: Exiting fullscreen mode is not allowed.');
          requestFullscreen();
      }
  });

  // Initialize fullscreen mode
  requestFullscreen();

  // Prevent browser refresh
  window.addEventListener('beforeunload', (e) => {
      e.preventDefault();
      e.returnValue = '';
      handleViolation('Refresh Attempt', 'Warning: Refreshing the page is not allowed during the exam.');
  });

  // Initialize history state to prevent back button
  window.history.pushState(null, null, window.location.href);
}

// Handle violations
function handleViolation(type, message) {
  const violation = {
      type: type,
      timestamp: new Date().toLocaleTimeString(),
      message: message
  };
  
  violationSystem.violations.push(violation);
  violationSystem.warningCount++;

  // Add violation message to chat with red color
  const messagesDiv = document.getElementById('chatMessages');
  const violationDiv = document.createElement('div');
  violationDiv.className = 'message bot-message violation';
  violationDiv.style.color = 'red';
  violationDiv.textContent = `${violation.timestamp}: ${violation.message}`;
  messagesDiv.appendChild(violationDiv);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;

  // Check if max warnings exceeded
  if (violationSystem.warningCount >= violationSystem.maxWarnings) {
      handleMaxViolations();
  }
}

// Handle maximum violations reached
function handleMaxViolations() {
  alert('Maximum violations reached. Your exam will be submitted automatically.');
  // Submit exam
  window.location.href = 'postloading.html';
}

// Request fullscreen mode
function requestFullscreen() {
  const elem = document.documentElement;
  if (elem.requestFullscreen) {
      elem.requestFullscreen();
  } else if (elem.webkitRequestFullscreen) {
      elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) {
      elem.msRequestFullscreen();
  }
  violationSystem.isFullscreen = true;
}

// Add CSS for violation messages
const style = document.createElement('style');
style.textContent = `
  .violation {
      background-color: #ffe6e6;
      border-left: 4px solid #ff0000;
      font-weight: bold;
  }
`;
document.head.appendChild(style);

// Ensure chatbot responses are not affected by violations
function generateResponse(query) {
    setTimeout(() => {
        const response = getResponseForQuery(query.toLowerCase());
        addMessage(response, 'bot');
    }, 500);
}

// Initialize violation detection when the page loads
document.addEventListener('DOMContentLoaded', initializeViolationDetection);

// prevent-selection Drag.js

const preventSelection = {
  isEnabled: true,

  // Initialize all prevention methods
  init() {
      this.preventTextSelection();
      this.preventDragAndDrop();
      this.preventImageDragging();
      this.preventCopyPaste();
      this.addNoSelectStyles();
  },

  // Prevent text selection
  preventTextSelection() {
      // Prevent mouse selection
      document.addEventListener('selectstart', (e) => {
          if (this.isEnabled) {
              e.preventDefault();
              this.handleViolation('Text Selection', 'Text selection is not allowed during the exam.');
          }
      });

      // Prevent touch selection
      document.addEventListener('touchstart', (e) => {
          if (this.isEnabled && e.touches.length > 1) {
              e.preventDefault();
              this.handleViolation('Touch Selection', 'Multi-touch gestures are not allowed during the exam.');
          }
      });

      // Prevent selection keyboard shortcuts
      document.addEventListener('keydown', (e) => {
          if (this.isEnabled) {
              // Ctrl/Cmd + A (Select All)
              if ((e.ctrlKey || e.metaKey) && e.key === 'a') {
                  e.preventDefault();
                  this.handleViolation('Keyboard Selection', 'Select all shortcut is not allowed during the exam.');
              }
          }
      });
  },

  // Prevent drag and drop operations
  preventDragAndDrop() {
      const events = ['dragstart', 'drag', 'dragenter', 'dragover', 'dragleave', 'drop'];
      
      events.forEach(eventType => {
          document.addEventListener(eventType, (e) => {
              if (this.isEnabled) {
                  e.preventDefault();
                  e.stopPropagation();
                  if (eventType === 'dragstart') {
                      this.handleViolation('Drag Attempt', 'Dragging content is not allowed during the exam.');
                  }
              }
          }, { capture: true });
      });
  },

  // Prevent image dragging specifically
  preventImageDragging() {
      document.querySelectorAll('img').forEach(img => {
          img.setAttribute('draggable', 'false');
          img.style.userSelect = 'none';
          img.style.webkitUserSelect = 'none';
      });

      // Handle dynamically added images
      const observer = new MutationObserver((mutations) => {
          mutations.forEach((mutation) => {
              mutation.addedNodes.forEach((node) => {
                  if (node.nodeName === 'IMG') {
                      node.setAttribute('draggable', 'false');
                      node.style.userSelect = 'none';
                      node.style.webkitUserSelect = 'none';
                  }
              });
          });
      });

      observer.observe(document.body, {
          childList: true,
          subtree: true
      });
  },

  // Prevent copy/paste operations
  preventCopyPaste() {
      const events = ['copy', 'paste', 'cut'];
      
      events.forEach(eventType => {
          document.addEventListener(eventType, (e) => {
              if (this.isEnabled) {
                  e.preventDefault();
                  this.handleViolation('Copy/Paste', `${eventType.charAt(0).toUpperCase() + eventType.slice(1)} operation is not allowed during the exam.`);
              }
          });
      });
  },

  // Add CSS styles to prevent selection
  addNoSelectStyles() {
      const style = document.createElement('style');
      style.textContent = `
          body {
              -webkit-user-select: none;
              -moz-user-select: none;
              -ms-user-select: none;
              user-select: none;
              -webkit-touch-callout: none;
          }
          
          /* Allow selection only in permitted input areas */
          input[type="text"],
          input[type="number"],
          textarea,
          [contenteditable="true"] {
              -webkit-user-select: text;
              -moz-user-select: text;
              -ms-user-select: text;
              user-select: text;
          }
      `;
      document.head.appendChild(style);
  },

  // Handle violations (integrate with your existing violation system)
  handleViolation(type, message) {
      // If you have an existing violation system, call it here
      if (typeof window.handleViolation === 'function') {
          window.handleViolation(type, message);
      } else {
          console.warn(`${type}: ${message}`);
      }
  },

  // Enable prevention methods
  enable() {
      this.isEnabled = true;
      this.addNoSelectStyles();
  },

  // Disable prevention methods (if needed for certain areas)
  disable() {
      this.isEnabled = false;
  }
};

// Initialize when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  preventSelection.init();
});

// Export for module usage if needed
if (typeof module !== 'undefined' && module.exports) {
  module.exports = preventSelection;
}
