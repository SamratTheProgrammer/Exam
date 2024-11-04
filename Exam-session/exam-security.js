// DOM Elements
const startExamBtn = document.querySelector('.start-exam-btn');
const checkbox = document.querySelector('.checkbox-container input');
const examScreen = document.querySelector('.exam-screen');
const header = document.querySelector('.header');
const timerWarning = document.querySelector('.timer-warning');
const questionNumbers = document.querySelectorAll('.question-number');
const navigationBtns = document.querySelectorAll('.navigation-buttons button');
const submitExamBtn = document.querySelector('.submit-exam');
const submitBox = document.querySelector('.submit-box');
const submitBg = document.querySelector('.bg');
const closeSubmitBtn = document.querySelector('.close');
const confirmSubmitBtn = document.querySelector('.confirm');
const logoutPopup = document.querySelector('#logout-pop_up');
const logoutBox = document.querySelector('.logout-box');
const logoutBg = document.querySelector('.bg-logout');
const cancelLogoutBtn = document.querySelector('.cancle');
const confirmLogoutBtn = document.querySelector('.logout');

// Exam State
let examState = {
    currentQuestion: 1,
    totalQuestions: 25,
    answeredQuestions: new Set(),
    markedQuestions: new Set(),
    timeRemaining: 1800, // 30 minutes in seconds
    examStarted: false
};

// Timer functionality
function startTimer() {
    const timerDisplay = document.querySelector('.timer');
    
    const timer = setInterval(() => {
        examState.timeRemaining--;
        const minutes = Math.floor(examState.timeRemaining / 60);
        const seconds = examState.timeRemaining % 60;
        timerDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        
        if (examState.timeRemaining <= 0) {
            clearInterval(timer);
            submitExam();
        }
    }, 1000);
}

// Fullscreen handling
function enterFullscreen() {
    const elem = document.documentElement;
    
    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) {
        elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
        elem.msRequestFullscreen();
    }
}

function exitFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
    }
}

// Start exam functionality
function startExam() {
    if (!checkbox.checked) {
        timerWarning.style.display = 'block';
        return;
    }
    
    examState.examStarted = true;
    enterFullscreen();
    startTimer();
    examScreen.style.display = 'grid';
    updateQuestionMap();
}

// Question navigation
function updateQuestionMap() {
    questionNumbers.forEach((num, index) => {
        if (examState.answeredQuestions.has(index + 1)) {
            num.classList.add('answered');
        } else if (examState.markedQuestions.has(index + 1)) {
            num.classList.add('marked');
        }
        
        if (index + 1 === examState.currentQuestion) {
            num.classList.add('current');
        } else {
            num.classList.remove('current');
        }
    });
}

function navigateQuestion(direction) {
    if (direction === 'next' && examState.currentQuestion < examState.totalQuestions) {
        examState.currentQuestion++;
    } else if (direction === 'prev' && examState.currentQuestion > 1) {
        examState.currentQuestion--;
    }
    updateQuestionMap();
}

function markForReview() {
    if (examState.markedQuestions.has(examState.currentQuestion)) {
        examState.markedQuestions.delete(examState.currentQuestion);
    } else {
        examState.markedQuestions.add(examState.currentQuestion);
    }
    updateQuestionMap();
}

// Answer handling
function handleAnswer(answer) {
    examState.answeredQuestions.add(examState.currentQuestion);
    updateQuestionMap();
}

// Submit exam functionality
function showSubmitConfirmation() {
    submitBox.classList.add('show');
    submitBg.classList.add('modal-background');
}

function hideSubmitConfirmation() {
    submitBox.classList.remove('show');
    submitBg.classList.remove('modal-background');
}

function submitExam() {
    // Add exam submission logic here
    exitFullscreen();
    // Redirect to result page or show completion message
}

// Logout handling
function showLogoutConfirmation() {
    logoutBox.classList.add('show');
    logoutBg.classList.add('logout-background');
}

function hideLogoutConfirmation() {
    logoutBox.classList.remove('show');
    logoutBg.classList.remove('logout-background');
}

function logout() {
    // Add logout logic here
    window.location.href = 'login.html';
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // Start exam button
    if (startExamBtn) {
        startExamBtn.addEventListener('click', startExam);
    }

    // Navigation buttons
    navigationBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            if (btn.classList.contains('prev-btn')) {
                navigateQuestion('prev');
            } else if (btn.classList.contains('next-btn')) {
                navigateQuestion('next');
            } else if (btn.classList.contains('mark-btn')) {
                markForReview();
            }
        });
    });

    // Question numbers in map
    questionNumbers.forEach((num, index) => {
        num.addEventListener('click', () => {
            examState.currentQuestion = index + 1;
            updateQuestionMap();
        });
    });

    // Answer options
    document.querySelectorAll('.ans').forEach(option => {
        option.addEventListener('click', () => handleAnswer(option.textContent));
    });

    // Submit exam
    if (submitExamBtn) {
        submitExamBtn.addEventListener('click', showSubmitConfirmation);
    }
    if (closeSubmitBtn) {
        closeSubmitBtn.addEventListener('click', hideSubmitConfirmation);
    }
    if (confirmSubmitBtn) {
        confirmSubmitBtn.addEventListener('click', submitExam);
    }

    // Logout
    if (logoutPopup) {
        logoutPopup.addEventListener('click', showLogoutConfirmation);
    }
    if (cancelLogoutBtn) {
        cancelLogoutBtn.addEventListener('click', hideLogoutConfirmation);
    }
    if (confirmLogoutBtn) {
        confirmLogoutBtn.addEventListener('click', logout);
    }

    // Info tooltip
    const infoButton = document.querySelector('.info-button');
    const infoTooltip = document.querySelector('.info-tooltip');
    if (infoButton && infoTooltip) {
        infoButton.addEventListener('mouseover', () => {
            infoTooltip.style.display = 'block';
        });
        infoButton.addEventListener('mouseout', () => {
            infoTooltip.style.display = 'none';
        });
    }

    // Prevent exiting fullscreen
    document.addEventListener('fullscreenchange', () => {
        if (!document.fullscreenElement && examState.examStarted) {
            enterFullscreen();
        }
    });

    // Prevent right-click
    document.addEventListener('contextmenu', (e) => {
        if (examState.examStarted) {
            e.preventDefault();
        }
    });

    // Prevent keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        if (examState.examStarted) {
            if (
                e.ctrlKey || 
                e.altKey || 
                e.key === 'F11' || 
                e.key === 'Escape'
            ) {
                e.preventDefault();
            }
        }
    });
});