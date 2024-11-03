// Get DOM elements
const body =document.querySelector("body"),
        sidebar =document.querySelector(".sidebar"),
        toggle =document.querySelector(".toggle"),
        searchBtn =document.querySelector(".search-box"),
        modeSwitch =document.querySelector(".toggle-switch"),
        modeText =document.querySelector(".mode-text");

        toggle.addEventListener("click", () =>{
            sidebar.classList.toggle("close");
        });
        searchBtn.addEventListener("click", () =>{
            sidebar.classList.remove("close");
        });

// Check for saved user preference, first in localStorage, then system setting
const userPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
const savedTheme = localStorage.getItem('theme');

// Apply the saved theme or system preference
if (savedTheme === 'dark' || (!savedTheme && userPrefersDark)) {
    body.classList.add('dark');
    modeText.innerText = "Light Mode";
} else {
    modeText.innerText = "Dark Mode";
}

// Toggle theme with smooth transition
modeSwitch.addEventListener("click", () => {
    // Add transition class for smooth color changes
    body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
    
    // Toggle dark class
    body.classList.toggle('dark');
    
    // Update localStorage with new theme preference
    localStorage.setItem('theme', body.classList.contains('dark') ? 'dark' : 'light');
    
    // Update button text
    modeText.innerText = body.classList.contains('dark') ? "Light Mode" : "Dark Mode";
});

// Listen for system theme changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    // Only apply system theme changes if user hasn't manually set a theme
    if (!localStorage.getItem('theme')) {
        if (e.matches) {
            body.classList.add('dark');
            modeText.innerText = "Light Mode";
        } else {
            body.classList.remove('dark');
            modeText.innerText = "Dark Mode";
        }
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const examQuestion = document.querySelector('.exam-question');
    const optionGroups = examQuestion.querySelectorAll('.option-group');
    const addOptionBtn = document.querySelector('.add-option-btn');
    let visibleOptionsCount = 2; // Initially 2 options are visible

    // Function to add delete button to an option group
    function addDeleteButton(optionGroup) {
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-option-btn';
        deleteBtn.innerHTML = '×';
        deleteBtn.title = 'Delete Option';
        deleteBtn.onclick = function() {
            if (visibleOptionsCount > 2) { // Prevent deleting if only 2 options remain
                optionGroup.classList.add('hidden');
                optionGroup.querySelector('input').value = ''; // Clear input value
                visibleOptionsCount--;
                updateAddButtonVisibility();
            }
        };
        optionGroup.appendChild(deleteBtn);
    }

    // Function to update add button visibility
    function updateAddButtonVisibility() {
        addOptionBtn.style.display = visibleOptionsCount >= 5 ? 'none' : 'block';
    }

    // Add click handler for the add option button
    addOptionBtn.onclick = function() {
        if (visibleOptionsCount < 5) {
            const nextOption = Array.from(optionGroups)[visibleOptionsCount];
            nextOption.classList.remove('hidden');
            if (!nextOption.querySelector('.delete-option-btn')) {
                addDeleteButton(nextOption);
            }
            visibleOptionsCount++;
            updateAddButtonVisibility();
        }
    };

    // Initialize delete buttons for existing options
    optionGroups.forEach((group, index) => {
        if (index > 1) { // Add delete buttons to all options except first two
            addDeleteButton(group);
        }
    });
});


const content = document.querySelector('.activity-content');
        const fadeOverlay = document.querySelector('.fade-overlay');
        const showMoreBtn = document.querySelector('.show-more-btn1');
        const btnText = document.querySelector('.btn-text');
        const chevronIcon = document.querySelector('.chevron-icon');
        const tableWrapper = document.querySelector('.table-wrapper');
        let isExpanded = false;

        showMoreBtn.addEventListener('click', () => {
            isExpanded = !isExpanded;
            content.classList.toggle('expanded');
            fadeOverlay.classList.toggle('hidden');
            chevronIcon.classList.toggle('expanded');
            btnText.textContent = isExpanded ? 'Show Less' : 'Show More';
            
            // Scroll table to top when collapsing
            if (!isExpanded) {
                tableWrapper.scrollTop = 0;
            }
        });

        // Prevent page scroll when table is scrolled
        tableWrapper.addEventListener('wheel', (e) => {
            const scrollTop = tableWrapper.scrollTop;
            const scrollHeight = tableWrapper.scrollHeight;
            const height = tableWrapper.clientHeight;
            
            if ((scrollTop === 0 && e.deltaY < 0) || 
                (scrollTop + height >= scrollHeight && e.deltaY > 0)) {
                return;
            }
            
            e.preventDefault();
            tableWrapper.scrollTop += e.deltaY;
        });


        let courses = [
            { id: '001', name: 'Python', duration: '6 months', type: 'Free', status: 'Active' },
            { id: '002', name: 'JavaScript', duration: '4 months', type: 'Free', status: 'Active' },
            { id: '003', name: 'Java', duration: '8 months', type: 'Paid', status: 'Active' },
            { id: '004', name: 'React', duration: '3 months', type: 'Free', status: 'Active' },
            { id: '005', name: 'Node.js', duration: '5 months', type: 'Paid', status: 'Active' },
            { id: '006', name: 'Angular', duration: '6 months', type: 'Paid', status: 'Inactive' },
            { id: '007', name: 'Vue.js', duration: '4 months', type: 'Free', status: 'Active' },
            { id: '008', name: 'PHP', duration: '6 months', type: 'Free', status: 'Active' },
            { id: '009', name: 'Tailwind.css', duration: '6 months', type: 'Paid', status: 'Inactive' },
            { id: '010', name: 'Vanila.css', duration: '4 months', type: 'Free', status: 'Active' },
            { id: '011', name: 'Flutter', duration: '6 months', type: 'Free', status: 'Active' },
            { id: '012', name: 'Kotlin', duration: '9 months', type: 'Free', status: 'Active' },
            { id: '013', name: 'Vanila.css', duration: '4 months', type: 'Free', status: 'Active' },
            { id: '014', name: 'Flutter', duration: '6 months', type: 'Free', status: 'Active' },
            { id: '015', name: 'Kotlin', duration: '9 months', type: 'Free', status: 'Active' }
        ];

        let editingIndex = -1;
        const ITEMS_PER_PAGE = 6;
        let currentlyShown = ITEMS_PER_PAGE;

        function renderCourses() {
            const courseList = document.getElementById('courseList');
            const showMoreBtn = document.getElementById('showMoreBtn');
            const courseCount = document.getElementById('courseCount');
            
            courseList.innerHTML = courses.slice(0, currentlyShown).map((course, index) => `
                <div class="course-details">
                    <span class="course-data">${course.id}</span>
                    <span class="course-data">${course.name}</span>
                    <span class="course-data">${course.duration}</span>
                    <span class="course-data">${course.type}</span>
                    <div class="update">
                        <button class="edit" onclick="openEditModal(${index})"><i class="bi bi-pencil-square"></i></button>
                        <button class="remove" onclick="removeCourse(${index})"><i class="bi bi-trash3"></i></button>
                    </div>
                    <span class="course-data">${course.status}</span>
                </div>
            `).join('');

            // Update course count and show more button
            courseCount.textContent = `Showing ${Math.min(currentlyShown, courses.length)} of ${courses.length} courses`;
            showMoreBtn.style.display = currentlyShown >= courses.length ? 'none' : 'inline-block';
            showMoreBtn.textContent = currentlyShown >= courses.length ? 'No More Courses' : 'Show More';
        }

        document.getElementById('showMoreBtn').addEventListener('click', function() {
            currentlyShown += ITEMS_PER_PAGE;
            renderCourses();
        });

        document.getElementById('courseForm').addEventListener('submit', function(e) {
            e.preventDefault();
            const newCourse = {
                id: document.getElementById('courseId').value,
                name: document.getElementById('courseName').value,
                duration: document.getElementById('courseDuration').value,
                type: document.getElementById('courseType').value,
                status: document.getElementById('courseStatus').value
            };
            courses.push(newCourse);
            renderCourses();
            this.reset();
        });

        function removeCourse(index) {
            if (confirm('Are you sure you want to remove this course?')) {
                courses.splice(index, 1);
                if (currentlyShown > courses.length) {
                    currentlyShown = courses.length;
                }
                renderCourses();
            }
        }

        function openEditModal(index) {
            editingIndex = index;
            const course = courses[index];
            document.getElementById('editCourseId').value = course.id;
            document.getElementById('editCourseName').value = course.name;
            document.getElementById('editCourseDuration').value = course.duration;
            document.getElementById('editCourseType').value = course.type;
            document.getElementById('editCourseStatus').value = course.status;
            document.getElementById('editModal').style.display = 'block';
        }

        function closeEditModal() {
            document.getElementById('editModal').style.display = 'none';
            editingIndex = -1;
        }

        document.getElementById('editForm').addEventListener('submit', function(e) {
            e.preventDefault();
            if (editingIndex === -1) return;

            courses[editingIndex] = {
                id: document.getElementById('editCourseId').value,
                name: document.getElementById('editCourseName').value,
                duration: document.getElementById('editCourseDuration').value,
                type: document.getElementById('editCourseType').value,
                status: document.getElementById('editCourseStatus').value
            };

            renderCourses();
            closeEditModal();
        });

        // Initial render
        renderCourses();