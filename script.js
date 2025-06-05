document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('task-input');
    const addTaskBtn = document.getElementById('add-task-btn');
    const taskList = document.getElementById('task-list');

    let tasks = [
        { id: 1, title: 'Read Fikir Eske Mekabir', completed: false, dateAdded: '2024-05-28' },
        { id: 2, title: 'Pay Elictricity', completed: true, dateAdded: '2024-05-27' },
        { id: 3, title: 'Write coding', completed: false, dateAdded: '2024-05-29' }
    ];

    function renderTasks() {
        taskList.innerHTML = '';
        tasks.forEach(task => {
            const li = document.createElement('li');
            li.dataset.id = task.id;
            if (task.completed) {
                li.classList.add('completed');
            }

            const taskInfoDiv = document.createElement('div');
            taskInfoDiv.classList.add('task-info');

            const taskTitle = document.createElement('span');
            taskTitle.classList.add('task-title');
            taskTitle.textContent = task.title;

            const taskDate = document.createElement('small');
            taskDate.classList.add('task-date');
            taskDate.textContent = `Added: ${task.dateAdded ? new Date(task.dateAdded).toLocaleDateString() : new Date().toLocaleDateString()}`;

            taskInfoDiv.appendChild(taskTitle);
            taskInfoDiv.appendChild(taskDate);

            const actionsDiv = document.createElement('div');
            actionsDiv.classList.add('task-actions');

            const completeBtn = document.createElement('button');
            completeBtn.classList.add('complete-btn');
            completeBtn.innerHTML = task.completed ? '&#x21BA;' : '&#x2714;';
            completeBtn.addEventListener('click', () => toggleComplete(task.id));

            const deleteBtn = document.createElement('button');
            deleteBtn.classList.add('delete-btn');
            deleteBtn.innerHTML = '&#x1F5D1;';
            deleteBtn.addEventListener('click', () => deleteTask(task.id));

            actionsDiv.appendChild(completeBtn);
            actionsDiv.appendChild(deleteBtn);

            li.appendChild(taskInfoDiv);
            li.appendChild(actionsDiv);
            taskList.appendChild(li);
        });
    }

    function addTask() {
        const title = taskInput.value.trim();
        if (title === '') {
            alert('Task title cannot be empty!');
            return;
        }
        const newTask = {
            id: Date.now(),
            title: title,
            completed: false,
            dateAdded: new Date().toISOString().split('T')[0]
        };
        tasks.push(newTask);
        taskInput.value = '';
        renderTasks();
    }

    function toggleComplete(id) {
        let taskNewlyCompleted = false;
        tasks = tasks.map(task => {
            if (task.id === id) {
                const updatedTask = { ...task, completed: !task.completed };
                if (updatedTask.completed) {
                    taskNewlyCompleted = true;
                }
                return updatedTask;
            }
            return task;
        });

        renderTasks();

        if (taskNewlyCompleted) {
            alert('Good job!');
        }
    }

    function deleteTask(id) {
        const taskToDelete = tasks.find(task => task.id === id);
        if (confirm(`Are you sure you want to delete the task: "${taskToDelete.title}"?`)) {
            tasks = tasks.filter(task => task.id !== id);
            renderTasks();
        }
    }

    addTaskBtn.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTask();
        }
    });

    renderTasks();
});
