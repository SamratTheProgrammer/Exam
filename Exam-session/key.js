// Utility to track key states
const KeyState = {
    winKey: false,
    altKey: false,
    tabKey: false,
    ctrlKey: false,
    lastKeyTime: 0,
    multiKeyTimeout: 500 // ms to detect multi-key combinations
};

// Create warning overlay
const warningOverlay = document.createElement('div');
warningOverlay.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.7);
    display: none;
    justify-content: center;
    align-items: center;
    z-index: 999999;
    color: white;
    font-family: Arial, sans-serif;
    font-size: 24px;
    text-align: center;
`;
document.body.appendChild(warningOverlay);

// Function to show warning
function showWarning(message, duration = 2000) {
    warningOverlay.textContent = message;
    warningOverlay.style.display = 'flex';
    
    setTimeout(() => {
        warningOverlay.style.display = 'none';
    }, duration);
}

// Function to handle blur events
function handleBlur(event) {
    // If window loses focus, immediately try to regain it
    window.focus();
    
    // Show warning
    showWarning("⚠️ Window switching detected! Please stay in the exam window.");
}

// Function to handle visibility change
function handleVisibilityChange() {
    if (document.hidden) {
        // Document is hidden (user switched tabs or minimized)
        showWarning("⚠️ Window switching detected! Please return to the exam.");
        
        // Request user attention when they switch back
        if (navigator.userActivation && navigator.userActivation.requestUserActivation) {
            navigator.userActivation.requestUserActivation();
        }
    }
}

// Enhanced key handling function
function handleKeys(event) {
    const currentTime = Date.now();
    const isMultiKeyCombo = (currentTime - KeyState.lastKeyTime) < KeyState.multiKeyTimeout;
    KeyState.lastKeyTime = currentTime;

    // Update key states
    if (event.key === 'Meta' || event.key === 'Windows') KeyState.winKey = event.type === 'keydown';
    if (event.key === 'Alt') KeyState.altKey = event.type === 'keydown';
    if (event.key === 'Tab') KeyState.tabKey = event.type === 'keydown';
    if (event.key === 'Control') KeyState.ctrlKey = event.type === 'keydown';

    // Define blocked combinations
    const blockedCombos = {
        'Win+D': KeyState.winKey && (event.key === 'd' || event.key === 'D'),
        'Win+Tab': KeyState.winKey && event.key === 'Tab',
        'Win+L': KeyState.winKey && (event.key === 'l' || event.key === 'L'),
        'Alt+Tab': KeyState.altKey && event.key === 'Tab',
        'Alt+Esc': KeyState.altKey && event.key === 'Escape',
        'Ctrl+Alt+Del': KeyState.ctrlKey && KeyState.altKey && event.key === 'Delete',
        'Win+Shift+S': KeyState.winKey && event.shiftKey && (event.key === 's' || event.key === 'S'),
        'Win+PrtScn': KeyState.winKey && event.key === 'PrintScreen'
    };

    // Check for blocked combinations
    for (const [combo, isBlocked] of Object.entries(blockedCombos)) {
        if (isBlocked) {
            event.preventDefault();
            event.stopPropagation();
            
            showWarning(`⚠️ ${combo} is not allowed during the exam`);
            
            // Force focus back to window
            window.focus();
            return false;
        }
    }

    // Prevent single Windows key press
    if (event.key === 'Meta' || event.key === 'Windows') {
        event.preventDefault();
        event.stopPropagation();
        showWarning("⚠️ Windows key is not allowed during the exam");
        return false;
    }

    // Additional prevention for task switching
    if (event.altKey && event.key === 'Tab') {
        event.preventDefault();
        event.stopPropagation();
        showWarning("⚠️ Alt+Tab is not allowed during the exam");
        return false;
    }
}

// Function to initialize prevention system
function initializeWindowsKeyPrevention() {
    // Add event listeners for key tracking
    document.addEventListener('keydown', handleKeys, true);
    document.addEventListener('keyup', handleKeys, true);
    
    // Add focus/blur detection
    window.addEventListener('blur', handleBlur, true);
    document.addEventListener('visibilitychange', handleVisibilityChange, true);
    
    // Prevent context menu
    document.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        return false;
    }, true);
    
    // Try to keep focus on window
    const keepFocus = setInterval(() => {
        if (!document.hasFocus()) {
            window.focus();
            showWarning("⚠️ Please keep the exam window focused");
        }
    }, 1000);

    // Initialize full screen on first interaction
    document.addEventListener('click', function initialClick() {
        if (document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen();
        }
        document.removeEventListener('click', initialClick);
    }, { once: true });

    // Keep track of mouse position
    let mouseOutCount = 0;
    document.addEventListener('mouseout', (e) => {
        if (e.clientY <= 0 || e.clientX <= 0 || 
            e.clientX >= window.innerWidth || e.clientY >= window.innerHeight) {
            mouseOutCount++;
            if (mouseOutCount > 3) {
                showWarning("⚠️ Please keep your mouse within the exam window");
                mouseOutCount = 0;
            }
        }
    });

    return () => {
        // Cleanup function
        clearInterval(keepFocus);
        document.removeEventListener('keydown', handleKeys, true);
        document.removeEventListener('keyup', handleKeys, true);
        window.removeEventListener('blur', handleBlur, true);
        document.removeEventListener('visibilitychange', handleVisibilityChange, true);
    };
}

// Start prevention system when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const cleanup = initializeWindowsKeyPrevention();
    
    // Optional: Add this to your exam submission handler
    function handleExamSubmit() {
        cleanup();
        warningOverlay.remove();
    }
});