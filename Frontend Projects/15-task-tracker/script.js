let tasksList = [];

function Task(description) {
  this.description = description;
  this.isCompleted = false;

  this.delete = function() {
    tasksList.splice(tasksList.indexOf(this), 1);
  }

  this.changeState = function() {
    this.isCompleted = !this.isCompleted;
  }
}

const inputTask = document.getElementById('task-input');
const buttonSubmitTask = document.getElementById('buttonSubmitTask');

buttonSubmitTask.addEventListener("click", addTask);
function addTask()
{
    const taskDescription = inputTask.value.trim();
    if(taskDescription!=='') 
        {
            const newTask = new Task(taskDescription);
            tasksList.unshift(newTask);
            
            inputTask.value = '';
            renderTasks();
        }
}

inputTask.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        addTask();
    }
});

function renderTasks()
{
    const listTasks = document.getElementById('listTasks');
    listTasks.innerHTML = '';
    tasksList.sort((a, b) =>  a.isCompleted - b.isCompleted );

    tasksList.forEach(task =>
        {
            const checkboxStateOfTask = document.createElement('input');
            checkboxStateOfTask.type = 'checkbox';
            checkboxStateOfTask.checked = task.isCompleted;
            checkboxStateOfTask.addEventListener("click", () => { task.changeState(); renderTasks()} );
            
            const taskText = document.createElement('span');
            taskText.textContent = task.description;
            if(task.isCompleted) taskText.classList.add('completed');;

            const deleteButton = document.createElement('button');
            deleteButton.addEventListener('click', () => { task.delete(); renderTasks() });
            deleteButton.innerText = '🗑️';
            deleteButton.classList.add('delete-btn');

            const tasksListItem = document.createElement('li');
            tasksListItem.appendChild(checkboxStateOfTask);
            tasksListItem.appendChild(taskText);
            tasksListItem.appendChild(deleteButton);

            listTasks.appendChild(tasksListItem);
        }
    );
}