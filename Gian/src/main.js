const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");

document.addEventListener("DOMContentLoaded", getLocalTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);


function addTodo(event) {
  event.preventDefault();

  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");

  const newTodo = document.createElement("li");
  newTodo.innerText = todoInput.value;
  newTodo.classList.add("todo-item");
  todoDiv.appendChild(newTodo);

  saveLocalTodos(todoInput.value);

  const todoActions = document.createElement("div");
  todoActions.classList.add("todo-actions");

  const doneButton = document.createElement("button");
  doneButton.innerText = "Done"; 
  doneButton.classList.add("done-btn");
  todoActions.appendChild(doneButton);

  const deleteButton = document.createElement("button");
  deleteButton.innerText = "Delete";
  deleteButton.classList.add("delete-btn");
  todoActions.appendChild(deleteButton);

  todoDiv.appendChild(todoActions);
  todoList.appendChild(todoDiv);

  todoInput.value = "";
}

function deleteCheck(e) {
  const item = e.target;

  if (item.classList.contains("delete-btn")) {
    const todo = item.parentElement.parentElement; 
    todo.classList.add("slide");

    todo.addEventListener("transitionend", function () {
      todo.remove();
    });
    removeLocalTodos(todo);
  }

  if (item.classList.contains("done-btn")) {
    const todo = item.parentElement.parentElement; 
    todo.classList.toggle("done");
  }
}

function saveLocalTodos(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos)); 
}

function getLocalTodos() {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.forEach(function(todo) {
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    const newTodo = document.createElement("li");
    newTodo.innerText = todo;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);

    const todoActions = document.createElement("div");
    todoActions.classList.add("todo-actions");

    const doneButton = document.createElement("button");
    doneButton.innerText = "Done"; 
    doneButton.classList.add("done-btn");
    todoActions.appendChild(doneButton);

    const deleteButton = document.createElement("button");
    deleteButton.innerText = "Delete";
    deleteButton.classList.add("delete-btn");
    todoActions.appendChild(deleteButton);

    todoDiv.appendChild(todoActions);
    todoList.appendChild(todoDiv);
  });
}

function removeLocalTodos(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  const todoIndex = todo.children[0].innerText; 
  todos.splice(todos.indexOf(todoIndex), 1); 
  localStorage.setItem("todos", JSON.stringify(todos)); 
}
