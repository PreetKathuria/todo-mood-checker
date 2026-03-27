const input = document.getElementById("input");
const addBtn = document.getElementById("addBtn");
const allBtn= document.getElementById("allBtn");
const completeBtn = document.getElementById("completeBtn");
const pendingBtn = document.getElementById("pendingBtn");
const todo = document.getElementById("todo");
const happy = document.getElementById("happy");
const sad = document.getElementById("sad");
const sleepy = document.getElementById("sleepy");
const angry = document.getElementById("angry");
const okayok = document.getElementById("okayok");
const slogan = document.getElementById("slogan");
const todos = document.getElementById("todos");

let tasks = [];

let currentFilter = "all";

window.onload = () => {
  let saved = localStorage.getItem("tasks");

  if (saved) {
    tasks = JSON.parse(saved);
    displayTasks();
  }
};

let completedTasks = JSON.parse(localStorage.getItem("completedTasks")) || [];

addBtn.addEventListener("click", () => {
  if (input.value === "") return;

  let task = input.value;

  tasks.push(task); 

  localStorage.setItem("tasks", JSON.stringify(tasks)); 

  displayTasks(); 

  input.value = ""; 
});

function displayTasks() {
  todos.innerHTML = "";

  tasks.forEach((task, index) => {

    let saved = localStorage.getItem("check_" + index);
    let isCompleted = saved === "true";

    if (currentFilter === "completed" && !isCompleted) return;
    if (currentFilter === "pending" && isCompleted) return;

    const newTodo = document.createElement("div");

    newTodo.innerHTML = `
      <label class="flex border-2 border-gray-400 w-[500px] my-1 gap-2 px-2 h-11 relative items-center overflow-auto whitespace-nowrap">
        <input type="checkbox" class="h-8 w-5 checkbox">
        <span>${task}</span>
        <button class="deleteBtn bg-red-600 text-white px-2 font-bold absolute right-2">x</button>
      </label>
    `;

    const checkbox = newTodo.querySelector(".checkbox");
    const text = newTodo.querySelector("span");
    const deleteBtn = newTodo.querySelector(".deleteBtn");

    if (saved === "true") {
      checkbox.checked = true;
      text.style.textDecoration = "line-through";
      text.style.opacity = "0.5";
      text.style.pointerEvents = "none";
      deleteBtn.innerText = "🗑️";
    }

    checkbox.addEventListener("change", () => {
      localStorage.setItem("check_" + index, checkbox.checked);

      if (checkbox.checked) {
        text.style.textDecoration = "line-through";
        text.style.opacity = "0.5";
        text.style.pointerEvents = "none";
        deleteBtn.innerText = "🗑️";
        checkbox.checked = true;
      }
    });

    deleteBtn.addEventListener("click", () => {
      tasks.splice(index, 1);
      localStorage.setItem("tasks", JSON.stringify(tasks));
      displayTasks();
    });

    todos.appendChild(newTodo);
  });
}

happy.addEventListener("click", () => {
  slogan.innerText = "ohhh, its graet , hape you have many more happy days take kisy from me 😘😽💋";
}); 

sad.addEventListener("click", () => {
  slogan.innerText = "oops!!! be happy naaa!!! this time will pass. fightinggg babbyyyy!!!! 🫂😽";
});

sleepy.addEventListener("click", () => {
  slogan.innerText = "awww myy babyyy just go to sleep and dont take any tension 🛌🏻🛏️";
});

angry.addEventListener("click", () => {
  slogan.innerText = "aee dont be angry na!! its bad for your health. whoom make you angry that person***** 🥊💀☠️🤺";
});

okayok.addEventListener("click", () => {
  slogan.innerText = "what happened is everything alright a big hug from me 🫂";
});

completeBtn.addEventListener("click", () => {
  currentFilter = "completed"; 
  displayTasks();

  allBtn.classList.remove("bg-blue-600");
  pendingBtn.classList.remove("bg-blue-600");

  allBtn.classList.add("bg-gray-200");
  pendingBtn.classList.add("bg-gray-200");

  completeBtn.classList.remove("bg-gray-200");
  completeBtn.classList.add("bg-blue-600");

  allBtn.classList.remove("text-white");
  allBtn.classList.add("text-black");

  completeBtn.classList.remove("text-black");
  completeBtn.classList.add("text-white");

  pendingBtn.classList.remove("text-white");
  pendingBtn.classList.add("text-black");
});

pendingBtn.addEventListener("click", () => {
  currentFilter = "pending"; 
  displayTasks();

  allBtn.classList.remove("bg-blue-600");
  completeBtn.classList.remove("bg-blue-600");

  allBtn.classList.add("bg-gray-200");
  completeBtn.classList.add("bg-gray-200");

  pendingBtn.classList.remove("bg-gray-200");
  pendingBtn.classList.add("bg-blue-600");

  allBtn.classList.remove("text-white");
  allBtn.classList.add("text-black");

  pendingBtn.classList.remove("text-black");
  pendingBtn.classList.add("text-white");

  completeBtn.classList.remove("text-white");
  completeBtn.classList.add("text-black");
});

allBtn.addEventListener("click", () => {
  currentFilter = "all"; 
  displayTasks();

  pendingBtn.classList.remove("bg-blue-600");
  completeBtn.classList.remove("bg-blue-600");

  pendingBtn.classList.add("bg-gray-200");
  completeBtn.classList.add("bg-gray-200");

  allBtn.classList.remove("bg-gray-200");
  allBtn.classList.add("bg-blue-600");

  pendingBtn.classList.remove("text-white");
  pendingBtn.classList.add("text-black");

  allBtn.classList.remove("text-black");
  allBtn.classList.add("text-white");

  completeBtn.classList.remove("text-white");
  completeBtn.classList.add("text-black");
});