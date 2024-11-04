// Create a security module to handle all exam security features
const ExamSecurity = {
    isExamMode: false,

    // Initialize security measures
    init() {
        // Check if exam is in progress from localStorage
        this.isExamMode = localStorage.getItem('examInProgress') === 'true';
        
        if (this.isExamMode) {
            this.enableSecurityMeasures();
        }
    },

    // Start exam security
    startExam() {
        this.isExamMode = true;
        localStorage.setItem('examInProgress', 'true');
        this.enableSecurityMeasures();
    },

    // End exam security
    endExam() {
        this.isExamMode = false;
        localStorage.setItem('examInProgress', 'false');
        this.disableSecurityMeasures();
    },

    // Enable all security measures
    enableSecurityMeasures() {
        this.enforceFullscreen();
        this.disableContextMenu();
        this.disableKeyboardShortcuts();
        this.preventCopyPaste();
        this.handleVisibilityChange();
        this.preventTabChange();
    },

    // Disable security measures
    disableSecurityMeasures() {
        document.removeEventListener('contextmenu', this.preventDefault);
        document.removeEventListener('keydown', this.handleKeydown);
        document.removeEventListener('copy', this.preventDefault);
        document.removeEventListener('paste', this.preventDefault);
        document.removeEventListener('cut', this.preventDefault);
        document.removeEventListener('visibilitychange', this.handleVisibilityChange);
        if (document.exitFullscreen) {
            document.exitFullscreen();
        }
    },

    // Enforce fullscreen
    async enforceFullscreen() {
        const elem = document.documentElement;
        
        try {
            if (!document.fullscreenElement) {
                await elem.requestFullscreen();
            }
        } catch (err) {
            console.error('Error attempting to enable fullscreen:', err);
        }

        // Handle fullscreen change
        document.addEventListener('fullscreenchange', () => {
            if (!document.fullscreenElement && this.isExamMode) {
                this.enforceFullscreen();
            }
        });
    },

    // Prevent default action
    preventDefault(e) {
        e.preventDefault();
        return false;
    },

    // Handle keyboard shortcuts
    handleKeydown(e) {
        const focusedElement = document.activeElement;
        const isExamAssistantInput = focusedElement?.id === 'chating' || 
                                   focusedElement?.closest('.chatbox');

        // Allow normal typing in chat
        if (isExamAssistantInput && !e.ctrlKey && !e.altKey && !e.metaKey) {
            return true;
        }

        // Block all dangerous combinations
        if (
            e.ctrlKey || 
            e.altKey || 
            e.metaKey || 
            e.key === 'F11' ||
            e.key === 'Tab' ||
            e.key === 'Escape' ||
            (e.key.startsWith('F') && !isNaN(e.key.slice(1)))
        ) {
            e.preventDefault();
            return false;
        }
    },

    // Handle tab visibility change
    handleVisibilityChange() {
        if (document.hidden && this.isExamMode) {
            // Log attempt to switch tabs
            console.warn('Tab switch attempted during exam');
            // You could implement additional measures here
            // like auto-submitting the exam or showing a warning
        }
    },

    // Prevent tab switching using browser events
    preventTabChange() {
        window.onbeforeunload = (e) => {
            if (this.isExamMode) {
                e.preventDefault();
                return false;
            }
        };
    },

    // Disable context menu
    disableContextMenu() {
        document.addEventListener('contextmenu', this.preventDefault);
    },

    // Disable keyboard shortcuts
    disableKeyboardShortcuts() {
        document.addEventListener('keydown', this.handleKeydown.bind(this));
    },

    // Prevent copy/paste
    preventCopyPaste() {
        document.addEventListener('copy', this.preventDefault);
        document.addEventListener('paste', this.preventDefault);
        document.addEventListener('cut', this.preventDefault);
    }
};

// Initialize security on each page load
document.addEventListener('DOMContentLoaded', () => {
    ExamSecurity.init();

    // Modify start exam button behavior
    const startButton = document.querySelector('.start-exam-container button');
    if (startButton) {
        startButton.addEventListener('click', () => {
            ExamSecurity.startExam();
            window.location.href = 'preloader.html';
        });
    }

    // Modify submit and logout buttons
    const submitButton = document.getElementById('confirm');
    const logoutButton = document.getElementById('logout');

    if (submitButton) {
        submitButton.addEventListener('click', () => {
            ExamSecurity.endExam();
            alert('Your paper submission was successful!');
            window.location.href = 'start.html';
        });
    }

    if (logoutButton) {
        logoutButton.addEventListener('click', () => {
            ExamSecurity.endExam();
            alert('Your logout was successful!');
            window.location.href = 'start.html';
        });
    }
});