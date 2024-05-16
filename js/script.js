let form = document.querySelector('.form');
let submit = document.querySelector('.add');
let input = document.querySelector('.input');
let tasksDiv = document.querySelector('.tasks');

let arrayOfTasks = [];

// Check if there is tasks in localStorage
if (window.localStorage.getItem('tasks')) {
    arrayOfTasks = JSON.parse(window.localStorage.getItem('tasks'));
    // Add tasks to tasksDiv
    addElementsToPageFrom(arrayOfTasks);
}

submit.onclick = _ => {
    // If input is empty don't do anythng
    if (!input.value) return;
    // Add task to arrayOfTasks
    addTaskToArray(input.value);
    // Empty input field 
    input.value = ''
}

// Click on task element
tasksDiv.addEventListener('click', (e) => {
    // Check if I clicked on delete button
    if (e.target.classList.contains('delete')) {
        // Remove the task from localStorage
        removeTaskFormLocalStorage(e.target.parentElement.getAttribute('data-id'));
        // Remove the task from the page
        e.target.parentElement.remove()
    }
    // Check if I clicked on task div
    if (e.target.classList.contains('task')) {
        // Toggle completed attribute in localStorage for a specific task
        toggleStatusTaskWith(e.target.getAttribute('data-id'))
        e.target.classList.toggle('done');
    }
})

let addTaskToArray = (taskText) => {
    // Task data
    const task = {
        id: Date.now(),
        title: taskText,
        completed: false,
    }
    // Push task to array of tasks
    arrayOfTasks.push(task);
    // Add task to page
    addElementsToPageFrom(arrayOfTasks);
}

function addElementsToPageFrom(arrayOfTasks) {
    // Empty tasks div
    tasksDiv.innerHTML = "";
    // Looping on arrayOfTasks
    arrayOfTasks.forEach(task => {
        // Create main div
        let div = document.createElement('div');
        div.className = 'task';
        // If the task is completed add class done
        task.completed && div.classList.add('done');
        div.setAttribute('data-id', task.id);
        div.appendChild(document.createTextNode(task.title));
        // Create delete button
        let span = document.createElement('span');
        span.className = 'delete'
        span.appendChild(document.createTextNode('Delete'));
        // Append delete button to the div
        div.appendChild(span);
        // Append div to tasksDiv
        tasksDiv.appendChild(div);

        AddDataToLocalStorage(arrayOfTasks)
    });
}

function AddDataToLocalStorage(arrayOfTasks) {
    window.localStorage.setItem('tasks', JSON.stringify(arrayOfTasks))
}

function removeTaskFormLocalStorage(taskId) {
    arrayOfTasks = arrayOfTasks.filter(task => task.id != taskId);
    AddDataToLocalStorage(arrayOfTasks);
}

function toggleStatusTaskWith(taskId) {
    arrayOfTasks = arrayOfTasks.map(task => {
        if (task.id == taskId) {
            task.completed = !task.completed;
        }
        return task
    })
    AddDataToLocalStorage(arrayOfTasks);
}