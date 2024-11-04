// Handle countdown timer and exam start functionality
document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.querySelector('.start-exam-container button');
    const checkbox = document.querySelector('.checkbox-container input[type="checkbox"]');
    const timerWarning = document.getElementById('timerWarning');
    const countdownElement = document.getElementById('countdown');
    const showMoreButton = document.querySelector('.fade-overlay');
    let examStarted = false;

    // Show More functionality for instructions
    if (showMoreButton) {
        showMoreButton.addEventListener('click', () => {
            const instructionsContainer = document.querySelector('.instructions-container');
            instructionsContainer.style.maxHeight = 'none';
            showMoreButton.style.display = 'none';
        });
    }

    // Timer functionality
    function startTimer(duration) {
        let timer = duration;
        let minutes, seconds;

        const countdown = setInterval(() => {
            minutes = parseInt(timer / 60, 10);
            seconds = parseInt(timer % 60, 10);

            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;

            countdownElement.textContent = minutes + ":" + seconds;

            if (--timer < 0) {
                clearInterval(countdown);
                startButton.disabled = true;
                timerWarning.style.display = 'block';
            } else if (timer <= 1800) { // Less than 30 minutes
                timerWarning.style.display = 'block';
            }
        }, 1000);
    }

    // Initialize timer (10 minutes = 600 seconds)
    startTimer(600);

    // Enable/disable start button based on checkbox
    if (checkbox) {
        checkbox.addEventListener('change', () => {
            startButton.disabled = !checkbox.checked;
        });
    }

    // Start exam button click handler
    if (startButton) {
        startButton.addEventListener('click', startExam);
    }
});

// Function to start the exam
function startExam() {
    const elem = document.documentElement;
    
    // Request fullscreen
    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) {
        elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
        elem.msRequestFullscreen();
    }

    // Enable exam security measures
    enableExamSecurity();
    
    // Redirect to exam page
    window.location.href = 'preloader.html';
}

// Function to enable exam security measures
function enableExamSecurity() {
    // Disable right click
    document.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        return false;
    });

    // Disable keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        // Allow only exam assistant chat input
        const focusedElement = document.activeElement;
        const isExamAssistantInput = focusedElement?.getAttribute('id') === 'chating' || 
                                   focusedElement?.closest('.chatbox');

        if (!isExamAssistantInput) {
            e.preventDefault();
            return false;
        }

        // Block dangerous combinations even in chat
        if (isExamAssistantInput) {
            if (e.ctrlKey || e.altKey || e.metaKey || 
                (e.key.startsWith('F') && !isNaN(e.key.slice(1)))) {
                e.preventDefault();
                return false;
            }
        }
    });

    // Prevent exiting fullscreen
    document.addEventListener('fullscreenchange', () => {
        if (!document.fullscreenElement && 
            !document.webkitFullscreenElement && 
            !document.mozFullScreenElement && 
            !document.msFullscreenElement) {
            const elem = document.documentElement;
            if (elem.requestFullscreen) {
                elem.requestFullscreen();
            } else if (elem.webkitRequestFullscreen) {
                elem.webkitRequestFullscreen();
            } else if (elem.msRequestFullscreen) {
                elem.msRequestFullscreen();
            }
        }
    });
}

// Add some CSS for the components
const style = document.createElement('style');
style.textContent = `
    .timer-warning {
        display: none;
        color: red;
        margin-top: 10px;
    }

    .instructions-container {
        max-height: 400px;
        overflow: hidden;
        position: relative;
    }

    .fade-overlay {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 100px;
        background: linear-gradient(transparent, white);
        cursor: pointer;
        display: flex;
        align-items: flex-end;
        justify-content: center;
        padding-bottom: 20px;
    }

    .start-exam-container button {
        opacity: 0.5;
        cursor: not-allowed;
    }

    .start-exam-container button:not([disabled]) {
        opacity: 1;
        cursor: pointer;
    }
`;
document.head.appendChild(style);