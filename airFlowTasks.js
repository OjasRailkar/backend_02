const express = require('express');
let cors = require("cors")

const app = express();
app.use(cors());

// Data
let tasks = [
  { taskId: 1, text: 'Fix bug #101', priority: 2 },
  { taskId: 2, text: 'Implement feature #202', priority: 1 },
  { taskId: 3, text: 'Write documentation', priority: 3 }
];
//****************************************************************** */

// Endpoint 1. Add a Task to the Task List
function addToTasks(tasks, taskId, text, priority) {
  let task = {
    taskId: taskId,
    text: text,
    priority: priority
  }
  tasks.push(task);
  return tasks
}


app.get('/tasks/add', (req, res) => {
  let taskId = parseInt(req.query.taskId)
  let text = req.query.text
  let priority = parseInt(req.query.priority)

  let result = addToTasks(tasks, taskId, text, priority)
  res.json({ tasks: result })
})

// Endpoint 2. Read All Tasks in the Task List
function readTasks(tasks) {
  return tasks
}

app.get('/tasks', (req, res) => {
  let result = readTasks(tasks)
  res.json({ tasks: result })
})

// Endpoint 3. Sort Tasks by Priority
function sortTasksByPriority(task1, task2) {
  return task1.priority - task2.priority
}

app.get('/tasks/sort-by-priority', (req, res) => {
  let tasksCopy = tasks.slice()
  let result = tasksCopy.sort(sortTasksByPriority)
  res.json({ tasks: result })
})

// Endpoint 4. Edit Task Priority
function updateTaskByPriority(tasks, taskId, priority) {
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].taskId === taskId) {
      tasks[i].priority = priority
    }
  }
  return tasks
}

app.get('/tasks/edit-priority', (req, res) => {
  let taskId = parseInt(req.query.taskId)
  let priority = parseInt(req.query.priority)

  let result = updateTaskByPriority(tasks, taskId, priority)
  res.json({ tasks: result })
})

//  Endpoint 5. Edit/Update Task Text
function updateTaskByText(tasks, taskId, text) {
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].taskId === taskId) {
      tasks[i].text = text
    }
  }
  return tasks
}

app.get('/tasks/edit-text', (req, res) => {
  let taskId = parseInt(req.query.taskId)
  let text = req.query.text

  let result = updateTaskByText(tasks, taskId, text)
  res.json({ tasks: result })
})

//Endpoint 6. Delete a Task from the Task List
function deleteTask(tasks, taskId){
  return tasks.filter( task => task.taskId !== taskId)
}

app.get('/tasks/delete', (req, res) => {
  let taskId = parseInt(req.query.taskId)

  let result = deleteTask(tasks, taskId)
  res.json({ tasks: result })
})

// Endpoint 7. Filter Tasks by Priority

function filterTaskByPriority(tasks, priority){
  return tasks.filter( task => task.priority === priority)
}

app.get('/tasks/filter-by-priority', (req, res) => {
  let priority = parseInt(req.query.priority)

  let result = filterTaskByPriority(tasks, priority)
  res.json({ tasks : result})
})






const port = 3000;
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
