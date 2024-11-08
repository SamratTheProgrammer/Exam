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

const loginButton = document.getElementById('login-btn');

loginButton.addEventListener('click', function(event) {
    event.preventDefault();
    
    // Example: Check if some condition is met
    if (validateLogin()) {
        window.location.href = "start.html";
    } else {
        alert("Login failed!");
    }
});

function validateLogin() {
    // Add your login validation logic here
    // Return true if login is successful, false otherwise
    return true;
}