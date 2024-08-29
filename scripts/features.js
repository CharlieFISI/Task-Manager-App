export function renderTasks(tasks, filterState = "all") {
  const taskList = document.getElementById("task-list");
  taskList.innerHTML = "";

  const filteredTasks = tasks.filter((task) => {
    if (filterState === "completed") {
      return task.completed;
    } else if (filterState === "pending") {
      return !task.completed;
    }
    return true;
  });

  filteredTasks.forEach((task, index) => {
    const taskItem = document.createElement("li");
    taskItem.className = `task-item ${
      task.completed ? "task-item--completed" : ""
    }`;
    taskItem.innerHTML = `
            <input type="checkbox" class="task-item__checkbox" ${
              task.completed ? "checked" : ""
            }>
            <span class="task-item__text">${task.text}</span>
            <input type="text" class="task-item__edit-input" value="${
              task.text
            }" style="display: none;">
            <button class="task-item__button task-item__button--edit">Editar</button>
            <button class="task-item__button task-item__button--delete">Eliminar</button>
        `;
    taskList.appendChild(taskItem);
  });
}

export function addTask(text, tasks) {
  tasks.push({ text, completed: false });
}

export function toggleTask(index, tasks) {
  tasks[index].completed = !tasks[index].completed;
}

export function editTask(taskItem, index, tasks) {
  const textSpan = taskItem.querySelector(".task-item__text");
  const editInput = taskItem.querySelector(".task-item__edit-input");
  const editButton = taskItem.querySelector(".task-item__button--edit");

  if (taskItem.classList.contains("task-item--editing")) {
    tasks[index].text = editInput.value;
    textSpan.textContent = editInput.value;
    textSpan.style.display = "inline";
    editInput.style.display = "none";
    editButton.textContent = "Editar";
    taskItem.classList.remove("task-item--editing");
  } else {
    textSpan.style.display = "none";
    editInput.style.display = "inline";
    editInput.focus();
    editInput.setSelectionRange(editInput.value.length, editInput.value.length);
    editButton.textContent = "Guardar";
    taskItem.classList.add("task-item--editing");
  }
}

export function deleteTask(index, tasks) {
  tasks.splice(index, 1);
}
