const inputTask = document.getElementById('task');
const buttonSubmitTask = document.getElementById('buttonSubmitTask');

buttonSubmitTask.addEventListener("click", addTask);
function addTask()
{
    if(inputTask.value!='') new Task(inputTask.value);
    inputTask.value = '';
    Render();
}


let tasksList = [];

function Task(description) {
  this.description = description;
  this.isCompleted = false;

  tasksList.unshift(this);

  this.delete = function() {
    tasksList.splice(tasksList.indexOf(this), 1);
  }

  this.changeState = function() {
    this.isCompleted = !this.isCompleted;
  }
}

function Render()
{
    const listTasks = document.getElementById('listTasks');
    listTasks.innerHTML = '';

    tasksList.forEach(task =>
        {
            const checkboxStateOfTask = document.createElement('input');
            checkboxStateOfTask.type = 'checkbox';
            checkboxStateOfTask.checked = task.isCompleted;
            checkboxStateOfTask.addEventListener("click", () => { task.changeState(); Render()} );

            const taskText = document.createElement('span');
            taskText.textContent = task.description;
            const taskListItem = document.createElement('li');

            const deleteButton = document.createElement('button');
            deleteButton.addEventListener('click', () => { task.delete(); Render() });

            taskListItem.appendChild(checkboxStateOfTask);
            taskListItem.appendChild(taskText);
            taskListItem.appendChild(deleteButton);


            listTasks.appendChild(taskListItem);
        }
    );
}

new Task("Привіт! Це перша таска");
Render();

