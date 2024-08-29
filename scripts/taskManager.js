import {
  renderTasks,
  addTask,
  toggleTask,
  editTask,
  deleteTask,
} from "./features.js";
import { showFeedback } from "./feedback.js";
import { saveTasks, loadTasks } from "./storage.js";

document.addEventListener("DOMContentLoaded", () => {
  const newTaskBtn = document.getElementById("new-task-btn");
  const filterBtn = document.getElementById("filter-btn");
  const filterMenu = document.getElementById("filter-menu");
  const filterOptions = document.querySelectorAll(".filter-option");
  const taskForm = document.getElementById("task-form");
  const taskInput = document.getElementById("task-input");
  const taskList = document.getElementById("task-list");

  let tasks = loadTasks();
  let filterState = "all";

  renderTasks(tasks, filterState);

  newTaskBtn.addEventListener("click", () => {
    taskForm.style.display =
      taskForm.style.display === "none" ? "flex" : "none";
    taskInput.focus();
  });

  filterBtn.addEventListener("click", () => {
    filterMenu.style.display =
      filterMenu.style.display === "none" ? "flex" : "none";
  });

  filterOptions.forEach((option) => {
    option.addEventListener("click", (e) => {
      filterState = e.target.dataset.filter;
      filterMenu.style.display = "none";
      if (filterState === "all") {
        filterBtn.className = "btn btn--secondary";
      } else {
        filterBtn.className = "btn btn--primary";
      }
      renderTasks(tasks, filterState);
    });
  });

  taskForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const text = taskInput.value.trim();
    if (text) {
      addTask(text, tasks);
      taskInput.value = "";
      saveTasks(tasks);
      renderTasks(tasks, filterState);
      showFeedback("Tarea añadida con éxito", "success");
    } else {
      showFeedback("Por favor, ingrese una tarea válida", "error");
    }
  });

  taskList.addEventListener("click", (e) => {
    const taskItem = e.target.closest(".task-item");
    if (!taskItem) return;

    const index = Array.from(taskList.children).indexOf(taskItem);

    if (e.target.classList.contains("task-item__checkbox")) {
      toggleTask(index, tasks);
      saveTasks(tasks);
      renderTasks(tasks, filterState);
      showFeedback("Estado de la tarea actualizado", "success");
    } else if (e.target.classList.contains("task-item__button--edit")) {
      editTask(taskItem, index, tasks);
      if (!taskItem.classList.contains("task-item--editing")) {
        saveTasks(tasks);
        renderTasks(tasks, filterState);
        showFeedback("Tarea actualizada con éxito", "success");
      }
    } else if (e.target.classList.contains("task-item__button--delete")) {
      deleteTask(index, tasks);
      saveTasks(tasks);
      renderTasks(tasks, filterState);
      showFeedback("Tarea eliminada con éxito", "success");
    }
  });

  taskList.addEventListener("keyup", (e) => {
    if (
      e.key === "Enter" &&
      e.target.classList.contains("task-item__edit-input")
    ) {
      const taskItem = e.target.closest(".task-item");
      const index = Array.from(taskList.children).indexOf(taskItem);
      editTask(taskItem, index, tasks);
      saveTasks(tasks);
      renderTasks(tasks, filterState);
      showFeedback("Tarea actualizada con éxito", "success");
    }
  });
});
