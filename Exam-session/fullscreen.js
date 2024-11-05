// Store the warning timeout ID and state
let warningTimeoutId = null;
let isFullscreen = false;
let examSubmitted = false;
let exitAttempts = 0;
const MAX_EXIT_ATTEMPTS = 10;
let preventKeyEvent = false;

// Create warning elements container
const warningContainer = document.createElement('div');
warningContainer.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    padding: 10px;
    z-index: 10000;
`;
document.body.appendChild(warningContainer);

// Create fullscreen warning element
const fullscreenWarning = document.createElement('div');
fullscreenWarning.style.cssText = `
    background-color: #ff4444;
    color: white;
    padding: 15px 30px;
    border-radius: 5px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    font-family: Arial, sans-serif;
    font-size: 16px;
    text-align: center;
    pointer-events: none;
    display: none;
`;
warningContainer.appendChild(fullscreenWarning);

// Create system keys warning element
const systemKeyWarning = document.createElement('div');
systemKeyWarning.style.cssText = `
    background-color: #ff8c00;
    color: white;
    padding: 15px 30px;
    border-radius: 5px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    font-family: Arial, sans-serif;
    font-size: 16px;
    text-align: center;
    pointer-events: none;
    display: none;
`;
warningContainer.appendChild(systemKeyWarning);

// Create persistent exam mode indicator
const examModeIndicator = document.createElement('div');
examModeIndicator.style.cssText = `
    // position: fixed;
    // bottom: 20px;
    // right: 20px;
    // background-color: #333;
    // color: white;
    // padding: 10px 20px;
    // border-radius: 5px;
    // font-family: Arial, sans-serif;
    // font-size: 14px;
    // z-index: 10000;
`;
examModeIndicator.textContent = "";
document.body.appendChild(examModeIndicator);

// Function to show warning message
function showWarning(warningElement, message, duration = 3000) {
    warningElement.textContent = message;
    warningElement.style.display = 'block';
    
    setTimeout(() => {
        warningElement.style.display = 'none';
    }, duration);
}

// Function to handle system key warnings
function showSystemKeyWarning(message) {
    showWarning(systemKeyWarning, message);
}

// Function to update fullscreen warning
function updateFullscreenWarning() {
    const message = `⚠️ Fullscreen is mandatory! Please maintain fullscreen mode! Attempt ${exitAttempts} of ${MAX_EXIT_ATTEMPTS}`;
    showWarning(fullscreenWarning, message, 5000);
}

// Function to force fullscreen
function forceFullscreen() {
    const element = document.documentElement;
    
    try {
        if (element.requestFullscreen) {
            element.requestFullscreen();
        } else if (element.webkitRequestFullscreen) {
            element.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
        } else if (element.mozRequestFullScreen) {
            element.mozRequestFullScreen();
        } else if (element.msRequestFullscreen) {
            element.msRequestFullscreen();
        }
    } catch (error) {
        console.error("Fullscreen request failed:", error);
    }
}

// Function to handle key events for exam mode
function handleExamKeyEvents(event) {
    if (examSubmitted) return;

    // Define blocked keys and combinations
    const blockedKeys = new Set(['Tab', 'Alt', 'Control', 'Meta', 'Escape', 
        'F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10', 'F11', 'F12']);
    
    if (
        blockedKeys.has(event.key) || // Block specific keys
        event.altKey || // Block Alt combinations
        (event.ctrlKey && !['c', 'v'].includes(event.key.toLowerCase())) || // Block Ctrl except copy/paste
        event.metaKey || // Block Windows/Command key
        (event.key === 'Tab' && (event.altKey || event.ctrlKey)) // Block Alt+Tab and Ctrl+Tab
    ) {
        event.preventDefault();
        event.stopPropagation();

        // Show appropriate warning message
        let warningMessage = "⚠️ This key combination is not allowed during the exam";
        if (event.altKey && event.key === 'Tab') {
            warningMessage = "⚠️ Alt + Tab is not allowed during the exam";
        } else if (event.ctrlKey && event.key === 'Tab') {
            warningMessage = "⚠️ Ctrl + Tab is not allowed during the exam";
        } else if (event.metaKey || event.key === 'Meta') {
            warningMessage = "⚠️ Windows key is not allowed during the exam";
        } else if (event.altKey) {
            warningMessage = "⚠️ Alt key combinations are not allowed during the exam";
        } else if (event.ctrlKey) {
            warningMessage = "⚠️ Ctrl key combinations are not allowed during the exam";
        }

        showSystemKeyWarning(warningMessage);
        return false;
    }
}

// Function to handle exit attempts
function handleExitAttempt(event) {
    if (!examSubmitted) {
        if (event) {
            event.preventDefault();
            event.stopPropagation();
        }
        
        if (exitAttempts < MAX_EXIT_ATTEMPTS) {
            exitAttempts++;
            updateFullscreenWarning();
        } else {
            showWarning(fullscreenWarning, "⚠️ Maximum attempts reached. Please contact proctor.", 0);
        }

        setTimeout(forceFullscreen, 100);
        return false;
    }
}

// Function to check fullscreen state
function checkFullscreenState() {
    if (!examSubmitted && !document.fullscreenElement && 
        !document.webkitFullscreenElement && 
        !document.mozFullScreenElement && 
        !document.msFullscreenElement) {
        handleExitAttempt();
    }
}

// Function to handle exam submission
function handleExamSubmit() {
    const submitBtn = document.querySelector('.submit-warn-btn');
    const confirmBtn = submitBtn?.querySelector(':last-child');
    
    if (confirmBtn) {
        confirmBtn.addEventListener('click', () => {
            examSubmitted = true;
            preventKeyEvent = false;
            
            // Exit fullscreen
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            }
            
            // Clean up
            document.removeEventListener('keydown', handleExamKeyEvents, true);
            document.removeEventListener('fullscreenchange', checkFullscreenState);
            document.removeEventListener('webkitfullscreenchange', checkFullscreenState);
            document.removeEventListener('mozfullscreenchange', checkFullscreenState);
            document.removeEventListener('MSFullscreenChange', checkFullscreenState);
            
            // Remove warnings and indicators
            warningContainer.remove();
            examModeIndicator.remove();
        });
    }
}

// Initialize exam mode
function initializeExamMode() {
    preventKeyEvent = true;
    
    // Event listeners for fullscreen changes
    document.addEventListener('fullscreenchange', checkFullscreenState);
    document.addEventListener('webkitfullscreenchange', checkFullscreenState);
    document.addEventListener('mozfullscreenchange', checkFullscreenState);
    document.addEventListener('MSFullscreenChange', checkFullscreenState);
    
    // Event listener for key prevention
    document.addEventListener('keydown', handleExamKeyEvents, true);
    
    // Initial fullscreen request on first click
    document.addEventListener('click', function initialClick() {
        if (!isFullscreen && !examSubmitted) {
            forceFullscreen();
            isFullscreen = true;
            document.removeEventListener('click', initialClick);
        }
    }, { once: true });
    
    // Setup exam submission handler
    handleExamSubmit();
    
    // Initial warnings
    showSystemKeyWarning("⚠️ System keys are now disabled for the exam");
    updateFullscreenWarning();
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeExamMode);

// Continuous fullscreen check
const fullscreenCheckInterval = setInterval(() => {
    if (!examSubmitted && !document.fullscreenElement && 
        !document.webkitFullscreenElement && 
        !document.mozFullScreenElement && 
        !document.msFullscreenElement) {
        forceFullscreen();
    }
}, 500);


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////




