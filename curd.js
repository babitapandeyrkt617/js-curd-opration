document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('task-form');
    const taskInput = document.getElementById('task-input');
    const taskSubmitButton = document.getElementById('task-submit-button');
    const taskList = document.getElementById('task-list');

    let tasks = [];
    let editingTaskId = null;

    taskForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const taskText = taskInput.value.trim();
        if (taskText) {
            if (editingTaskId) {
                const task = tasks.find(t => t.id === editingTaskId);
                task.text = taskText;
                editingTaskId = null;
                taskSubmitButton.textContent = 'Add Task';
            } else {
                const task = {
                    id: Date.now(),
                    text: taskText
                };
                tasks.push(task);
            }
            renderTasks();
            taskInput.value = '';
        }
    });

    function renderTasks() {
        taskList.innerHTML = '';
        tasks.forEach(task => {
            const li = document.createElement('li');
            const span = document.createElement('span');
            span.textContent = task.text;
            span.addEventListener('click', () => startEditing(task.id, task.text));
            const editButton = document.createElement('button');
            editButton.textContent = 'Edit';
            editButton.classList.add('edit-btn');
            editButton.addEventListener('click', () => startEditing(task.id, task.text));
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.addEventListener('click', () => deleteTask(task.id));
            li.append(span, editButton, deleteButton);
            taskList.appendChild(li);
        });
    }

    function startEditing(id, text) {
        taskInput.value = text;
        taskInput.focus();
        editingTaskId = id;
        taskSubmitButton.textContent = 'Update Task';
    }

    function deleteTask(id) {
        tasks = tasks.filter(t => t.id !== id);
        renderTasks();
        if (editingTaskId === id) {
            editingTaskId = null;
            taskSubmitButton.textContent = 'Add Task';
        }
    }
});
