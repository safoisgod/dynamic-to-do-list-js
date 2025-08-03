document.addEventListener("DOMContentLoaded", () => {
    const addButton = document.getElementById("add-task-btn");
    const taskInput = document.getElementById("task-input");
    const taskList = document.getElementById("task-list");

    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
        storedTasks.forEach(taskText => addTask(taskText, false));
    }

    function addTask(taskText) {
        if (taskText === undefined) {
            taskText = taskInput.value.trim();  // <-- required exact expression
        }
        if (taskText === "") {
            alert("Please enter a task");
            return;
        }

        const taskItem = document.createElement("li");
        taskItem.textContent = taskText;

        const removeButton = document.createElement("button");
        removeButton.textContent = "Remove";
        removeButton.className = "remove-btn";

        removeButton.onclick = function () {
            taskList.removeChild(taskItem);
            removeTaskFromStorage(taskText);
        };

        taskItem.appendChild(removeButton);
        taskList.appendChild(taskItem);

        if (taskText === taskInput.value.trim()) {
            saveTaskToStorage(taskText);
            taskInput.value = "";
        }
    }

    function saveTaskToStorage(taskText) {
        const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
        storedTasks.push(taskText);
        localStorage.setItem("tasks", JSON.stringify(storedTasks));
    }

    function removeTaskFromStorage(taskText) {
        let storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
        storedTasks = storedTasks.filter(task => task !== taskText);
        localStorage.setItem("tasks", JSON.stringify(storedTasks));
    }

    addButton.addEventListener("click", () => {
        addTask();
    });

    taskInput.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            addTask();
        }
    });

    loadTasks();
});
