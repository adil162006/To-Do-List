const inputBox = document.getElementById('input-box');
const listContainer = document.getElementById('list-container');
const addButton = document.getElementById('add-btn');
const clearAllButton = document.getElementById('clear-all');
const filterButtons = document.querySelectorAll('.filter-btn');

// Load tasks from local storage
function loadTasks() {
    listContainer.innerHTML = localStorage.getItem('todoData') || '';
    attachDeleteListeners();
}

// Save tasks to local storage
function saveTasks() {
    localStorage.setItem('todoData', listContainer.innerHTML);
}

// Add new task
function addTask() {
    if (inputBox.value === '') {
        alert('Please write something!');
        return;
    }

    const li = document.createElement('li');
    li.innerHTML = inputBox.value;
    li.innerHTML += '<span>×</span>';
    listContainer.appendChild(li);
    
    inputBox.value = '';
    saveTasks();
    attachDeleteListeners();
}

// Attach event listeners to delete buttons
function attachDeleteListeners() {
    const spans = listContainer.querySelectorAll('span');
    spans.forEach(span => {
        span.onclick = function(e) {
            e.stopPropagation();
            span.parentElement.remove();
            saveTasks();
        };
    });
}

// Filter tasks
function filterTasks(filter) {
    const tasks = listContainer.getElementsByTagName('li');
    
    for (let task of tasks) {
        switch(filter) {
            case 'all':
                task.style.display = 'block';
                break;
            case 'pending':
                task.style.display = task.classList.contains('checked') ? 'none' : 'block';
                break;
            case 'completed':
                task.style.display = task.classList.contains('checked') ? 'block' : 'none';
                break;
        }
    }
}

// Event Listeners
addButton.addEventListener('click', addTask);

inputBox.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTask();
    }
});

listContainer.addEventListener('click', (e) => {
    if (e.target.tagName === 'LI') {
        e.target.classList.toggle('checked');
        saveTasks();
    }
});

clearAllButton.addEventListener('click', () => {
    if (confirm('Are you sure you want to clear all tasks?')) {
        listContainer.innerHTML = '';
        saveTasks();
    }
});

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Update active button
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        // Filter tasks
        filterTasks(button.getAttribute('data-filter'));
    });
});

// Load tasks when page loads
loadTasks();