const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const sortOptions = document.querySelector(".sort-options");
const todoDeadline = document.querySelector(".todo-deadline");

todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
sortOptions.addEventListener("change", sortTodos);

function addTodo(event) {
  event.preventDefault();

  const task = todoInput.value;
  const deadline = todoDeadline.value;

  if (!task) return; 

  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");

  const newTodo = document.createElement("li");
  newTodo.innerText = task;
  newTodo.classList.add("todo-item");
  todoDiv.appendChild(newTodo);

  const deadlineSpan = document.createElement("span");
  deadlineSpan.classList.add("deadline");
  deadlineSpan.innerText = deadline ? `Due: ${formatDate(new Date(deadline))}` : "No Deadline";
  todoDiv.appendChild(deadlineSpan);

  saveLocalTodos(task, deadline);

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
  todoDeadline.value = "";
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

function saveLocalTodos(task, deadline) {
  let todos = localStorage.getItem("todos") ? JSON.parse(localStorage.getItem("todos")) : [];
  todos.push({ task, deadline });
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getLocalTodos() {
  let todos = localStorage.getItem("todos") ? JSON.parse(localStorage.getItem("todos")) : [];
  todos.forEach(todo => {
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    const newTodo = document.createElement("li");
    newTodo.innerText = todo.task;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);

    const deadlineSpan = document.createElement("span");
    deadlineSpan.classList.add("deadline");
    deadlineSpan.innerText = todo.deadline ? `Due: ${formatDate(new Date(todo.deadline))}` : "No Deadline";
    todoDiv.appendChild(deadlineSpan);

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
  let todos = localStorage.getItem("todos") ? JSON.parse(localStorage.getItem("todos")) : [];
  const task = todo.children[0].innerText;
  todos = todos.filter(t => t.task !== task);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function sortTodos() {
  const todos = Array.from(todoList.children);
  todos.sort((a, b) => {
    const sortBy = sortOptions.value;

    if (sortBy === "name") {
      const nameA = a.querySelector(".todo-item").innerText.toLowerCase();
      const nameB = b.querySelector(".todo-item").innerText.toLowerCase();
      return nameA.localeCompare(nameB); 
    } else if (sortBy === "latest") {
      const dateA = a.querySelector(".deadline").innerText.includes('Due:')
        ? new Date(a.querySelector(".deadline").innerText.split('Due: ')[1])
        : new Date(0); 
      const dateB = b.querySelector(".deadline").innerText.includes('Due:')
        ? new Date(b.querySelector(".deadline").innerText.split('Due: ')[1])
        : new Date(0); 
      return dateB - dateA; 
    } else if (sortBy === "oldest") {
      const dateA = a.querySelector(".deadline").innerText.includes('Due:')
        ? new Date(a.querySelector(".deadline").innerText.split('Due: ')[1])
        : new Date(0);
      const dateB = b.querySelector(".deadline").innerText.includes('Due:')
        ? new Date(b.querySelector(".deadline").innerText.split('Due: ')[1])
        : new Date(0); 
      return dateA - dateB; 
    }
    return 0; 
  });
  

  todoList.innerHTML = "";
  todos.forEach(todo => todoList.appendChild(todo));
}

function formatDate(date) {
  const options = {
    year: 'numeric', 
    month: '2-digit', 
    day: '2-digit', 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: false
  };
  return date.toLocaleString('en-US', options).replace(/:\d{2} /, ' '); 
}

getLocalTodos()
